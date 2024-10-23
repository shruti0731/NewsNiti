// import React from 'react';

// function AboutUs() {
//   return (
//     <section className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-4">About Us</h2>
//       <p>
//       Welcome to UPSC NewsApp!
//       Our goal is to keep you informed with the latest news and insights that matter most for your UPSC preparation. We offer a curated selection of news articles, categorized to help you quickly find topics critical for the UPSC syllabus. Stay updated with essential information on
//       </p>
//     </section>
//   );
// }

// export default AboutUs;
import React from 'react';

function AboutUs() {
  return (
    <section className="h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side with specific image dimensions and infinite animation */}
      <div 
        className="flex items-center justify-center"
        style={{ height: '100%', width: '100%', backgroundColor: '#d3d3d3' }} // Set background color to light grey
      >
        <img 
          src="https://www.interhacktives.com/wp-content/uploads/2019/03/43017.png" 
          alt="News background"
          style={{
            height: '60%',  // Adjusted size
            width: '70%',   // Adjusted size
            objectFit: 'cover',
            animation: 'scaleAnimation 2s ease-in-out infinite',
            transformOrigin: 'center center'
          }}
        />
      </div>

      {/* Right side with content */}
      <div className="flex flex-col items-center justify-center bg-gray-300 p-6 text-gray-800"> {/* Changed bg-white to bg-gray-300 */}
        <h2 
          style={{ fontSize: '50px', color: 'black' }} 
          className="text-3xl font mb-4"
        >
        Highlights
        
        </h2>
        <p className="text-center max-w-md" style={{fontSize:'20px'}}> {/* Added font-bold class */}
          "Welcome to UPSC NewsApp! Our goal is to keep you informed with the latest news and insights that matter most for your UPSC preparation. We offer a curated selection of news articles, categorized to help you quickly find topics critical for the UPSC syllabus. Stay updated with essential information on"
        </p>
      </div>

      {/* Inline keyframes style */}
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

export default AboutUs;
