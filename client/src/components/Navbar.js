import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50 font-sans">
      
      <Link 
        to="/" 
        className="text-3xl font-bold tracking-tight text-white"
      >
        NewsNiti
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        <Link 
          to="/" 
          className="text-indigo-100 font-medium hover:text-white transition-colors"
        >
          Home
        </Link>
        <Link 
          to="/topics" 
          className="text-indigo-100 font-medium hover:text-white transition-colors"
        >
          Topics
        </Link>
        <Link 
          to="/allnews" 
          className="text-indigo-100 font-medium hover:text-white transition-colors"
        >
          All News
        </Link>
        <Link 
          to="/contact" 
          className="text-indigo-100 font-medium hover:text-white transition-colors"
        >
          Contact
        </Link>

        {/* Login Button */}
        <Link 
          to="/login" 
          className="bg-white text-indigo-700 py-2.5 px-5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors shadow"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
