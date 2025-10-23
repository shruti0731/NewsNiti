import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const NewspaperIcon = () => (
  <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-3-4h3" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-8 h-8 text-cyan-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const AcademicCapIcon = () => (
  <svg className="w-8 h-8 text-rose-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13.5M8.25 6.253l-3.029 2.11a.5.5 0 00-.221.416v4.44a.5.5 0 00.221.416l3.029 2.11M15.75 6.253l3.029 2.11a.5.5 0 01.221.416v4.44a.5.5 0 01-.221.416l-3.029 2.11M12 21.75l-3.75-2.625M12 21.75l3.75-2.625M3.375 8.363l3.029 2.11M20.625 8.363l-3.029 2.11M12 12.75V3.75M3 15V9" />
  </svg>
);



function Home() {
  const navigate = useNavigate();

  const handleExploreNowClick = () => {
    navigate('/login');
  };

  return (

    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center bg-gradient-to-r from-indigo-50 via-white to-indigo-50 text-gray-800">
      
      <div className="flex flex-col justify-center p-8 md:p-12 lg:p-24 h-full">
        
      
        <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
          Stay Informed, Faster
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-indigo-900">
          Welcome to NewsNiti
        </h2>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
          Our platform transforms how you consume news. Get concise, AI-powered summaries to quickly grasp essential information, ensuring you stay informed on topics that matter.
        </p>
        

        <button 
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-in-out self-start" 
          onClick={handleExploreNowClick}
        >
          Explore Now
        </button>
      </div>

   
      <div className="flex items-center justify-center p-8 md:p-12 h-full">
        <div className="space-y-6 w-full max-w-md">
       
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
            <div className="flex items-start space-x-4">
            
              <div className="flex-shrink-0 p-3 bg-amber-100 rounded-full">
                <NewspaperIcon />
              </div>
              <div>
               
                <h4 className="text-xl font-semibold mb-1 text-amber-800">Personalized Feeds</h4>
                <p className="text-gray-600">
                  From technology and politics to sports, get news that truly matters to you.
                </p>
              </div>
            </div>
          </div>

    
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
            <div className="flex items-start space-x-4">
         
              <div className="flex-shrink-0 p-3 bg-cyan-100 rounded-full">
                <BoltIcon />
              </div>
              <div>
             
                <h4 className="text-xl font-semibold mb-1 text-cyan-800">AI-Powered Summaries</h4>
                <p className="text-gray-600">
                  Understand complex stories in seconds. Our AI cuts through the noise for you.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
            <div className="flex items-start space-x-4">
      
              <div className="flex-shrink-0 p-3 bg-rose-100 rounded-full">
                <AcademicCapIcon />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1 text-rose-800">Focused Prep Mode</h4>
                <p className="text-gray-600">
                  Tailored content focused on current affairs and topics for exam preparation.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Home;