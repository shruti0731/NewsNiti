import React from 'react';

function AboutUs() {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center bg-gradient-to-r from-indigo-50 via-white to-indigo-50 text-gray-800">
      <div className="flex items-center justify-center p-8 md:p-12">
        <img 
          src="https://www.interhacktives.com/wp-content/uploads/2019/03/43017.png" 
          alt="About Us"
          className="w-full max-w-lg h-auto object-cover rounded-xl shadow-2xl transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center p-8 md:p-12 lg:p-24 h-full">
        
        <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
          About NewsNiti
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-indigo-900">
          Our Mission
        </h2>

        <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
          In a world of constant information overload, staying truly informed is a challenge. For aspirants preparing for competitive exams like the UPSC, it's a critical daily battle.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          NewsNiti was born from this simple idea: to cut through the noise. We use advanced AI to scan, analyze, and summarize the world's most important news, delivering only the essential insights you need. Our mission is to make your preparation smarter, faster, and more focused.
        </p>
      </div>
    </section>
  );
}

export default AboutUs;