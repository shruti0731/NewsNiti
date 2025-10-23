import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

function CountryNews({ user, theme, toggleTheme, onAddNote }) {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);

  const categoryLabel = `Country: ${params.iso.toUpperCase()}`;

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  const pageSize = 6;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setData([]); 
    fetch(`https://news-aggregator-dusky.vercel.app/country/${params.iso}?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((myJson) => {
        if (myJson.success) {
          setTotalResults(myJson.data.totalResults);
          setData(myJson.data.articles);
        } else {
          setError(myJson.message || 'An error occurred');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, params.iso]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-50">

      <main className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
        
        <h5 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-8 text-center">
          {categoryLabel}
        </h5>

        {error && (
          <div className="text-center p-4 mb-4 text-lg font-medium text-red-800 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Loader />
          </div>
        ) : (
          <>
            {data.length === 0 && !error && (
              <div className="text-center p-4 mb-4 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg">
                No news articles found for this country.
              </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {data.map((element, index) => (
                <EverythingCard
                  key={element.url || index} 
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage}
                  publishedAt={element.publishedAt}
                  url={element.url}
                  user={user}
                  author={element.author}
                  source={element.source.name}
                  onAddNote={onAddNote} 
                />
              ))}
            </div>

            {!isLoading && data.length > 0 && (
              <div className="pagination flex justify-center gap-6 md:gap-8 my-12 items-center">
                <button 
                  disabled={page <= 1} 
                  className='py-2 px-5 rounded-lg font-semibold text-white bg-indigo-600 shadow-md hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-in-out disabled:bg-indigo-300 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed'
                  onClick={handlePrev}
                >
                  &larr; Prev
                </button>
                
                <p className='text-base md:text-lg font-medium text-gray-700'>
                  Page {page} of {Math.ceil(totalResults / pageSize)}
                </p>
                
                <button 
                  className='py-2 px-5 rounded-lg font-semibold text-white bg-indigo-600 shadow-md hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-in-out disabled:bg-indigo-300 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed'
                  disabled={page >= Math.ceil(totalResults / pageSize)} 
                  onClick={handleNext}
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default CountryNews;