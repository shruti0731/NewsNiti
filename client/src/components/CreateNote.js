import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CreateNote = ({ passNote, user, showNotification }) => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  const InputEvent = (event) => {
    const { name, value } = event.target;
    setNote(prev => ({ ...prev, [name]: value }));
  };

  const addEvent = async (event) => {
    event.preventDefault();

    // Validate input
    if (!note.title.trim()) {
      showNotification?.("Title cannot be empty", "failure");
      return;
    }

    if (!note.content.trim()) {
      showNotification?.("Content cannot be empty", "failure");
      return;
    }

    if (!user?.email) {
      showNotification?.("You must be logged in to save a note", "failure");
      return;
    }

    setLoading(true);
    try {
      // Send to backend 
      const res = await axios.post('http://localhost:3000/notes', {
        userEmail: user.email,
        title: note.title.trim(),
        content: note.content.trim()
      });

      passNote(res.data);  // Add note to frontend state after successful save
      setNote({ title: "", content: "" }); // Reset input fields
      showNotification?.("Note created successfully!", "success");
    } catch (err) {
      console.error(err);
      // Display backend message if note exists
      const msg = err.response?.data?.message || "Failed to create note";
      showNotification?.(msg, "failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold text-indigo-900 mb-4 text-center">Create a New Note</h2>
      <form onSubmit={addEvent} className="flex flex-col space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={InputEvent}
            placeholder="Note Title"
            autoComplete="off"
            className="block w-full px-4 py-3 rounded-lg border border-gray-300 text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            rows="4"
            id="content"
            name="content"
            value={note.content}
            onChange={InputEvent}
            placeholder="Write your note here..."
            className="block w-full px-4 py-3 rounded-lg border border-gray-300 text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out hover:-translate-y-0.5 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          <span>{loading ? "Saving..." : "Create"}</span>
          <FontAwesomeIcon icon={faPlus} className="ml-2" />
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
