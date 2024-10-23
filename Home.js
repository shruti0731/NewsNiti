// import React from 'react';

// function Home() {
//   return (
//     <section className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-4">Welcome to Newsapp</h2>
//       <p className="mb-4">
//       Our platform provides concise summaries to help you quickly grasp essential information, ensuring you stay informed on topics that matter. Whether it’s current affairs, technology, economics, or more, we deliver the news in a format that’s easy to digest and perfect for UPSC aspirants. Dive into curated content and make your preparation smarter with our tailored news summaries.
//       </p>
//       <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//         Explore Now
//       </button>
//     </section>
//   );
// }

// export default Home;
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleExploreNowClick = () => {
    navigate('/login');
  };

  return (
    <section className="h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-300"> {/* Set background color to grey */}
      {/* Left side for text */}
      <div className="flex flex-col items-start justify-center p-6"> {/* Flex column for text */}
        <h2 className="text-3xl font-bold mb-4">Welcome to Newsapp</h2>
        <p className="mb-4" style={{ fontSize: '20px' }}> {/* Use inline style for font size */}
          Our platform provides concise summaries to help you quickly grasp essential information, ensuring you stay informed on topics that matter. Whether it’s current affairs, technology, economics, or more, we deliver the news in a format that’s easy to digest and perfect for UPSC aspirants. Dive into curated content and make your preparation smarter with our tailored news summaries.
        </p>
        <button 
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" 
          onClick={handleExploreNowClick}
        >
          Explore Now
        </button>
      </div>

      {/* Right side for image */}
      <div className="flex items-center justify-center"> {/* Center the image */}
        <img 
          src="https://thumbs.dreamstime.com/z/live-news-cartoon-tv-broadcast-sport-fans-journalist-interview-television-media-studio-breaking-reporting-protest-utter-215846095.jpg" 
          alt="News Background" 
          style={{
            height: '60%', // Adjust height to fit nicely
            width: '80%', // Adjust width as needed
            objectFit: 'cover',
            animation: 'scaleAnimation 2s ease-in-out infinite', // Animation properties
            transformOrigin: 'center center' // Cover the area without distortion
          }} 
        />
      </div>

      {/* Inline keyframes style for animation */}
      <style>
        {`
          @keyframes scaleAnimation {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}
      </style>
    </section>
  );
}

export default Home;