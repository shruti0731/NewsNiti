import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

function EverythingCard({ 
  user, 
  title, 
  description, 
  imgUrl, 
  publishedAt, 
  url, 
  author, 
  source, 
  onAddNote 
}) {
  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const formatDate = (isoString) => {
    if (!isoString) return "Not available";
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return isoString;
    }
  };

  const handleSummarizeToggle = async () => {
    if (!showModal && !summary) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/summarize-news",
          { url: url, title: title },
          { headers: { "Content-Type": "application/json" }, timeout: 10000 }
        );
        setSummary(response.data.summary);
      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary("Failed to generate summary. Please try again.");
      }
      setLoading(false);
    }
    setShowModal(!showModal);
  };

  const handleCardAddNote = () => {
    if (onAddNote) {
      onAddNote({ title: title, content: description });
      alert("Note added!"); 
    } else {
      console.warn("onAddNote prop not provided to EverythingCard");
    }
  };

  const handleModalAddNote = () => {
    if (onAddNote) {
      onAddNote({ title: title, content: summary });
      alert("Summary added to notes!");
    } else {
      console.warn("onAddNote prop not provided to EverythingCard");
    }
    setShowModal(false); 
  };
  
  if (!source || !imgUrl || source === "[Removed]" || imgUrl === "[Removed]") {
    return null;
  }

  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-white flex flex-col justify-between h-full border border-gray-100">
      <div className="flex-grow p-5">
        
        <b className="title text-xl font-bold mb-3 text-indigo-900 line-clamp-3">{title}</b>
        
        {imgUrl && (
          <div className="my-4">
            <img
              className="w-full rounded-md object-cover max-h-60"
              src={imgUrl}
              alt={title}
            />
          </div>
        )}
        
        <div className="description mt-2">
          <p className="description-text text-gray-700 line-clamp-3">
            {description?.substring(0, 200)}
            {description?.length > 200 && "..."}
          </p>
        </div>
        
        <div className="info mt-4 space-y-2">
          <div className="source-info flex items-center gap-2">
            <span className="font-semibold text-gray-800">Source:</span>
            {source ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 hover:underline break-all"
              >
                {source?.substring(0, 70)}
              </a>
            ) : (
              <span className="text-gray-500">Not available</span>
            )}
          </div>
          
          <div className="origin flex flex-col">
            <p className="origin-item text-gray-600 text-sm">
              <span className="font-semibold text-gray-800">Published:</span> {formatDate(publishedAt)}
            </p>
          </div>
        </div>
      </div>
      
      {user && (
        <div className="p-5 bg-gray-50 border-t border-gray-100">
          <div className="flex gap-3">
            <button
              onClick={handleSummarizeToggle}
              disabled={loading}
              className="flex-1 flex justify-center items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-wait"
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Summarizing...
                </>
              ) : (
                "Summarize News"
              )}
            </button>
            
            <button 
              onClick={handleCardAddNote}
              className="flex-1 flex justify-center items-center gap-2 bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-700 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add to Notes
            </button>
          </div>
        </div>
      )}
  
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="modal-content bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-3xl w-full relative max-h-[90vh] flex flex-col">
            
            <button
              onClick={handleSummarizeToggle}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
            >
              <span className="text-3xl font-light">&times;</span>
            </button>
            
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-4 pr-10">
              Summary of {title}
            </h2>
            
            <p className="text-gray-700 text-lg overflow-y-auto whitespace-pre-wrap">
              {summary || "No summary available for this news."}
            </p>
            
            <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                onClick={handleModalAddNote}
              >
                Add Summary to Notes
              </button>
              <button
                onClick={handleSummarizeToggle}
                className="flex-1 bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
  
export default EverythingCard;