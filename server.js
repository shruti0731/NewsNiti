// const express=require("express");
// const app=express();
// const cors =require("cors");
// app.use(cors());
// const Employeemodel=require('./models/employee')
// app.use(express.json());

// const mongoose =require("mongoose")
// mongoose.connect("mongodb://localhost:27017/product", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// app.post('/register',(req,res)=>{
//   Employeemodel.create(req.body)
//   .then(employee=>res.json(employee))
//   .catch(err=>res.json(err))

// })
// app.get('/',(req,res)=>{
//   res.send("hello server");
// })
// app.listen(4000,()=>{
//   console.log("server listening  on 4000 port")
//})






//*****
// const express = require("express");
// const app = express();

// const cors = require("cors");
// const mongoose = require("mongoose");
// require('dotenv').config();
// const Joi = require("joi");
// app.use(cors());
// app.use(express.json()); // Middleware to parse JSON

// // const Employeemodel = require('./models/employee');
// const bcryptjs=require("bcryptjs");
// const bcrypt = require("bcryptjs/dist/bcrypt");
// mongoose.connect("mongodb://localhost:27017/product")
// const db=mongoose.connection;
// db.on('error',(err)=>{
//   console.log("Mongodb connection error",err);
// })
// db.once('open',()=>{
//   console.log("mongodb is connected");

// })

// const EmployeeSchema = new mongoose.Schema({
//   name: {type:String,unique:true},
//   email: { type: String, unique: true }, // Ensure email is unique
//   password: String
// });


// const Employeemodel=mongoose.model("employees",EmployeeSchema);
// app.post('/register',async(req,res)=>{
//   try
//   {
//     const hashpassword=await bcrypt.hashSync(req.body.password,10);
//   const newuser=new Employeemodel({
//   name:req.body.name,
//   email:req.body.email,
//   password:hashpassword
// });
// const saveduser=await newuser.save();
// res.status(200).json(saveduser);
//   }
//   catch(err)
//   {
//     console.log("error during registration",err);
//     res.status(404).json({err:"internal server error"});

//   }
// })



//******* */

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken"); 
// require("dotenv").config();

// app.use(cors());
// app.use(express.json()); // Middleware to parse JSON
// // Ensure your model is correctly exported

// // Connect to MongoDB


// mongoose.connect("mongodb://localhost:27017/product");
// // mongoose.connect("mongodb+srv://amrutapatil070921:vFDMTJdfGjBu7A5S@cluster0.lqyxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")//00
// const db = mongoose.connection;
// db.on("error", (err) => {
//   console.log("MongoDB connection error", err);
// });
// db.once("open", () => {
//   console.log("MongoDB is connected");
// });

// const EmployeeSchema = new mongoose.Schema({
//   name: { type: String, unique: true },
//   email: { type: String, unique: true }, // Ensure email is unique
//   password: String,
// });


// const Employeemodel = mongoose.model("employees", EmployeeSchema);

// // Registration Endpoint
// app.post("/register", async (req, res) => {
//   try {
//     const hashpassword = await bcrypt.hash(req.body.password, 10);
//     const newuser = new Employeemodel({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashpassword,
//     });
//     const saveduser = await newuser.save();
//     res.status(200).json(saveduser);
//   } catch (err) {
//     console.log("Error during registration", err);
//     res.status(404).json({ err: "Internal server error" });
//   }
// });

// // Login Endpoint
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await Employeemodel.findOne({ email: email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: 'Invalid email or password' });
//     }

//     // Successful login
//     res.status(200).json({ success: true, message: 'Login successful' });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });


// app.listen(5000, () => {
//   console.log("Server listening on port 5000");
// });
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const notesRoutes = require("./routes/notes");
require("dotenv").config();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON



mongoose.connect("mongodb://localhost:27017/product");
const db = mongoose.connection;
db.on("error", (err) => {
  console.log("MongoDB connection error", err);
});
db.once("open", () => {
  console.log("MongoDB is connected");
});

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String, unique: true }, // Ensure email is unique
  password: String,
});


const Employeemodel = mongoose.model("employees", EmployeeSchema);


app.post("/register", async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await Employeemodel.findOne({ email: req.body.email });
    if (existingUser) {
      alert(`User already exists`);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password and create a new user
    const hashpassword = await bcrypt.hash(req.body.password, 10);
    const newuser = new Employeemodel({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
    });

    // Save the new user to the database
    const saveduser = await newuser.save();
    res.status(200).json(saveduser);
  } catch (err) {
    console.log("Error during registration", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Employeemodel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Successful login
    res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      user: {
        name: user.name,  // Include user name
        email: user.email ,
       
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/',(req,res)=>{
  console.log("serevr");
});
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
// const express = require("express");
// const cors = require("cors");
// const { summarizeText } = require("./summarizer");
// const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Endpoint to summarize a specific news article
app.post("/summarize-news", async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim().length === 0) {
    return res.status(400).json({ message: "Text is required for summarization." });
  }

  try {
    const summary = await summarizeText(text);
    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error while summarizing the news article.",
      error: error.message,
    });
  }
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(Server is running on port ${PORT});
// });
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// require("dotenv").config();

// app.use(cors());
// app.use(express.json()); // Middleware to parse JSON

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/product");
// const db = mongoose.connection;
// db.on("error", (err) => {
//   console.log("MongoDB connection error", err);
// });
// db.once("open", () => {
//   console.log("MongoDB is connected");
// });

// // Employee Schema
// const EmployeeSchema = new mongoose.Schema({
//   name: { type: String, unique: true },
//   email: { type: String, unique: true },
//   password: String,
// });

// const Employeemodel = mongoose.model("employees", EmployeeSchema);

// // Note Schema
// const NoteSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'employees', required: true },
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }, // Optional: to keep track of when the note was created
// });

// const Notemodel = mongoose.model("notes", NoteSchema);

// // Create a new note
// app.post('/notes', async (req, res) => {
//   const { userId, title, content } = req.body;

//   try {
//     const newNote = new Notemodel({
//       userId,
//       title,
//       content,
//     });
//     const savedNote = await newNote.save();
//     res.status(201).json(savedNote);
//   } catch (err) {
//     console.error("Error creating note:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await Employeemodel.findOne({ email: email });
//       if (!user) {
//         return res.status(400).json({ success: false, message: 'Invalid email or password' });
//       }
  
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ success: false, message: 'Invalid email or password' });
//       }
  
//       // Successful login
//       res.status(200).json({ 
//         success: true, 
//         message: 'Login successful',
//         user: {
//           name: user.name,  // Include user name
//           email: user.email ,
         
//         }
//       });
//     } catch (error) {
//       console.error("Login error:", error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   });
//   app.post("/register", async (req, res) => {
//   try {
//     // Check if the user already exists
//     const existingUser = await Employeemodel.findOne({ email: req.body.email });
//     if (existingUser) {
//       alert(`User already exists`);
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password and create a new user
//     const hashpassword = await bcrypt.hash(req.body.password, 10);
//     const newuser = new Employeemodel({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashpassword,
//     });

//     // Save the new user to the database
//     const saveduser = await newuser.save();
//     res.status(200).json(saveduser);
//   } catch (err) {
//     console.log("Error during registration", err);
//     res.status(500).json({ err: "Internal server error" });
//   }
// });
  
// // Get notes for a specific user
// app.get('/notes', async (req, res) => {
//   const { userId } = req.query; // Get userId from query parameters

//   try {
//     const notes = await Notemodel.find({ userId });
//     res.json(notes);
//   } catch (err) {
//     console.error("Error fetching notes:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Delete a note
// app.delete('/notes/:id', async (req, res) => {
//   try {
//     await Notemodel.findByIdAndDelete(req.params.id);
//     res.status(204).send(); // No content
//   } catch (err) {
//     console.error("Error deleting note:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server listening on port 3000");
// });

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// console.log("JWT Secret:", process.env.JWT_SECRET);

// app.use(cors());
// app.use(express.json()); // Middleware to parse JSON

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/product");
// const db = mongoose.connection;
// db.on("error", (err) => {
//   console.log("MongoDB connection error", err);
// });
// db.once("open", () => {
//   console.log("MongoDB is connected");
// });

// // Employee Schema
// const EmployeeSchema = new mongoose.Schema({
//   name: { type: String, unique: true },
//   email: { type: String, unique: true },
//   password: String,
// });

// const Employeemodel = mongoose.model("employees", EmployeeSchema);

// // Note Schema
// const NoteSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'employees', required: true },
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Notemodel = mongoose.model("notes", NoteSchema);

// // Middleware to authenticate JWT
// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

//   if (!token) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//   });
// };

// // Create a new note
// app.post('/notes', authenticateToken, async (req, res) => {
//   const { title, content } = req.body;
//   const userId = req.user.id; // Get user ID from the token

//   try {
//     const newNote = new Notemodel({
//       userId,
//       title,
//       content,
//     });
//     const savedNote = await newNote.save();
//     res.status(201).json(savedNote);
//   } catch (err) {
//     console.error("Error creating note:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Login endpoint
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await Employeemodel.findOne({ email: email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: 'Invalid email or password' });
//     }

//     // Successful login: create a JWT token
//     const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWTPRIVATEKEY, { expiresIn: '1h' });

//     res.status(200).json({ 
//       success: true, 
//       message: 'Login successful',
//       token
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Register endpoint
// app.post("/register", async (req, res) => {
//   try {
//     const existingUser = await Employeemodel.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashpassword = await bcrypt.hash(req.body.password, 10);
//     const newuser = new Employeemodel({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashpassword,
//     });

//     const saveduser = await newuser.save();
//     res.status(200).json(saveduser);
//   } catch (err) {
//     console.log("Error during registration", err);
//     res.status(500).json({ err: "Internal server error" });
//   }
// });

// // Get notes for a specific user
// app.get('/notes', authenticateToken, async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const notes = await Notemodel.find({ userId });
//     res.json(notes);
//   } catch (err) {
//     console.error("Error fetching notes:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Delete a note
// app.delete('/notes/:id', authenticateToken, async (req, res) => {
//   try {
//     await Notemodel.findByIdAndDelete(req.params.id);
//     res.status(204).send(); // No content
//   } catch (err) {
//     console.error("Error deleting note:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server listening on port 3000");
// });

