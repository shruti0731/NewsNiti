// routes/notes.js
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Get notes for a user
router.get('/', noteController.getNotesForUser);

// Create a new note
router.post('/', noteController.createNote);

// Delete a note
router.delete('/:id', noteController.deleteNote);

module.exports = router;
