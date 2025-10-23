import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBriefcase, 
  faFilm, 
  faGlobe, 
  faHeartPulse, 
  faFlask, 
  faFutbol, 
  faMicrochip, 
  faLandmark 
} from '@fortawesome/free-solid-svg-icons';

const categories = [
  { name: "business", icon: faBriefcase, color: "text-blue-600", iconBg: "bg-blue-100" },
  { name: "entertainment", icon: faFilm, color: "text-pink-600", iconBg: "bg-pink-100" },
  { name: "general", icon: faGlobe, color: "text-gray-600", iconBg: "bg-gray-100" },
  { name: "health", icon: faHeartPulse, color: "text-red-600", iconBg: "bg-red-100" },
  { name: "science", icon: faFlask, color: "text-purple-600", iconBg: "bg-purple-100" },
  { name: "sports", icon: faFutbol, color: "text-orange-600", iconBg: "bg-orange-100" },
  { name: "technology", icon: faMicrochip, color: "text-cyan-600", iconBg: "bg-cyan-100" },
  { name: "politics", icon: faLandmark, color: "text-indigo-600", iconBg: "bg-indigo-100" },
];

function TopicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
      <main className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-8 text-center">
          Explore Topics
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-12 text-center max-w-2xl mx-auto">
          Choose a category to see the top headlines and stay informed on the subjects that matter most to you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/top-headlines/${category.name}`}
              className={`block p-6 bg-white rounded-2xl shadow-lg border border-gray-100 
                          transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105
                          group hover:border-indigo-200`}  >
              <div className="flex flex-col items-center text-center">
               
                <div className={`p-4 rounded-full mb-4 ${category.iconBg} transition-all duration-300 group-hover:scale-110`}>
                  <FontAwesomeIcon 
                    icon={category.icon} 
                    className={`text-4xl ${category.color}`} 
                  />
                </div>
                
   
                <h3 className="text-2xl font-bold text-indigo-900 capitalize group-hover:text-indigo-700 transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
          
        </div>
      </main>
    </div>
  );
}

export default TopicsPage;