const express = require("express");
const cors = require("cors");
const sanitizeHtml = require("sanitize-html"); 
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const cheerio = require("cheerio");
const { summarizeText } = require("./summariser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect("mongodb://localhost:27017/product", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.error("MongoDB connection error", err));
db.once("open", () => console.log("MongoDB connected"));

// ==========================================
// Mongoose Schemas & Models

// Employee
const EmployeeSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});
const Employeemodel = mongoose.model("employees", EmployeeSchema);

// Notes
const NoteSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const NoteModel = mongoose.model("notes", NoteSchema);

// News Summaries
const NewsSummarySchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
});
const NewsSummaryModel = mongoose.model("newsSummaries", NewsSummarySchema);

// ==========================================
// Helper: Scrape content from URL
async function scrapeContent(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let content = "";
    $("p").each((_, el) => {
      content += $(el).text() + " ";
    });

    return content.trim();
  } catch (err) {
    console.error("Error scraping content from URL:", err);
    throw new Error("Unable to scrape content from the provided URL.");
  }
}

// ==========================================
// Routes

// Get all notes for a user
app.get("/notes/:email", async (req, res) => {
  try {
    const notes = await NoteModel.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

// Create a new note (with duplicate check)
app.post("/notes", async (req, res) => {
  const { userEmail, title, content } = req.body;

  if (!userEmail || !title || !content)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    // Check for duplicate note for this user (same title & content)
    const exists = await NoteModel.findOne({
      userEmail,
      title: title.trim(),
      content: content.trim(),
    });
    if (exists)
      return res.status(400).json({ message: "Note with this title and content already exists" });

    const newNote = new NoteModel({
      userEmail,
      title: title.trim(),
      content: content.trim(),
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save note" });
  }
});

// Delete a note by ID
app.delete("/notes/:id", async (req, res) => {
  try {
    await NoteModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete note" });
  }
});

// ==========================================
// User Registration
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new Employeemodel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error during registration", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Employeemodel.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ==========================================
// Summarize News
app.post("/summarize-news", async (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({ message: "Both url and title are required." });
  }

  try {
    // Step 1: Scrape content
    let content = await scrapeContent(url);

    // Step 2: Sanitize
    const sanitizedContent = sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} });

    // Step 3: Check if summary already exists
    const existingSummary = await NewsSummaryModel.findOne({ url });
    if (existingSummary) {
      return res.status(200).json({ summary: existingSummary.summary });
    }

    // Step 4: Summarize
    const summary = await summarizeText(sanitizedContent);

    // Step 5: Save to DB
    const newSummary = new NewsSummaryModel({ url, title, summary });
    await newSummary.save();

    res.status(200).json({ summary });
  } catch (err) {
    console.error("Error during summarization:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// ==========================================
app.listen(3000, () => console.log("Server listening on port 3000"));
