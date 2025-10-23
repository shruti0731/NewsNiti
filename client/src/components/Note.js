import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Note = ({ id, title, content, userEmail, deleteItem, showNotification }) => {
  const [loading, setLoading] = useState(false);

  const deleteNote = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      deleteItem(id); 
      showNotification?.("Note deleted successfully!", "success");
    } catch (err) {
      console.error(err);
      showNotification?.("Failed to delete note.", "failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between h-full border border-gray-100">
      <div className="flex-grow overflow-y-auto mb-4">
        <h4 className="font-bold text-xl text-indigo-900 mb-2 break-words">{title}</h4>
        <p className="text-gray-700 text-base break-words whitespace-pre-wrap">{content}</p>
      </div>
      <button
        onClick={deleteNote}
        disabled={loading}
        className={`w-full flex justify-center items-center gap-2 py-2 px-4 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        <span>{loading ? "Deleting..." : "Delete"}</span>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default Note;
