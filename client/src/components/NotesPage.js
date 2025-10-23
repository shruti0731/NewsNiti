import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Note from './Note';
import CreateNote from './CreateNote';
import Notifications from './Notifications';

function NotesPage({ user, theme, toggleTheme, initialNote, onPageLoad }) {
  const [notes, setNotes] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const initialNoteAdded = useRef(false); 

  const showNotification = useCallback((message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  }, []);


  const fetchNotes = useCallback(async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(`http://localhost:3000/notes/${user.email}`);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      showNotification('Failed to fetch notes', 'failure');
    }
  }, [user, showNotification]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Add a new note
  const addNote = useCallback(async (newNote, showSuccess = true) => {
    if (!user?.email) {
      showNotification('You must be logged in to save a note', 'failure');
      return;
    }

    if (notes.some(n => n.title.trim().toLowerCase() === newNote.title.trim().toLowerCase())) {
      showNotification('Note with this title already exists', 'failure');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/notes', {
        userEmail: user.email,
        title: newNote.title.trim(),
        content: newNote.content.trim()
      });

      setNotes(prev => [res.data, ...prev]);
      if (showSuccess) showNotification('Note created successfully!', 'success');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Failed to create note';
      showNotification(msg, 'failure');
    }
  }, [user, notes, showNotification]);

  // Delete a note
  const deleteNote = useCallback(async (id) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      setNotes(prev => prev.filter(note => note._id !== id));
      showNotification('Note deleted successfully!', 'success');
    } catch (err) {
      console.error(err);
      showNotification('Failed to delete note', 'failure');
    }
  }, [showNotification]);

  // Add initial note if passed from another page (only once)
  useEffect(() => {
    if (initialNote?.title && !initialNoteAdded.current) {
      addNote(initialNote, false);
      initialNoteAdded.current = true;
      onPageLoad?.();
    }
  }, [initialNote, onPageLoad, addNote]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
      <Notifications message={notification.message} type={notification.type} />

      <main className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="mb-12">
          <CreateNote
            passNote={addNote}
            user={user}
            showNotification={showNotification}
            existingNotes={notes} 
          />
        </div>

        {notes.length === 0 ? (
          <div className="text-center p-8 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg">
            You don't have any notes yet. Use the form above to create one!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map(note => (
              <Note
                key={note._id}
                id={note._id}
                title={note.title}
                content={note.content}
                deleteItem={deleteNote}
                showNotification={showNotification}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default NotesPage;
