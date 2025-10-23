import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-6 shadow-inner-top font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">

        {/* Column 1: Brand */}
        <div>
          <h5 className="font-bold text-indigo-200 text-2xl tracking-tight mb-1">NewsNiti</h5>
          <p className="text-sm text-indigo-200">
            Simplifying the world's news, one summary at a time.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h5 className=" text-indigo-200 text-lg font-semibold mb-1">Quick Links</h5>
          <ul className="space-y-1 text-indigo-200 text-sm">
            <li><Link to="/" className=" text-indigo-200 hover:text-white hover:underline">Home</Link></li>
            <li><Link to="/topics" className=" text-indigo-200 hover:text-white hover:underline">Topics</Link></li>
            <li><Link to="/allnews" className=" text-indigo-200 hover:text-white hover:underline">All News</Link></li>
          </ul>
        </div>
        
        <div>
          <h5 className=" text-indigo-200 text-lg font-semibold mb-1">Connect</h5>
          <ul className=" text-indigo-200 space-y-1 text-indigo-200 text-sm">
            <li className=' text-indigo-200'>Email: <a href="mailto:support@newsniti.com" className=" text-indigo-200 hover:text-white hover:underline">support@newsniti.com</a></li>
            <li className=' text-indigo-200'>Follow us on 
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-white hover:underline">Twitter</a>, 
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-white hover:underline">Facebook</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-indigo-400/30 mt-6 pt-4 text-center text-sm text-indigo-200">
        &copy; {new Date().getFullYear()} NewsNiti. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
