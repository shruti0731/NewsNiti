// controllers/noteController.js
const Note = require('../models/Notes');

// Get notes for a specific user
exports.getNotesForUser = async (req, res) => {
  const { userId } = req.query;
  const notes = await Note.find({ userId });
  res.json(notes);
};

// Create a new note
exports.createNote = async (req, res) => {
  const newNote = new Note(req.body);
  await newNote.save();
  res.status(201).json(newNote);
};

// Delete a note
exports.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
