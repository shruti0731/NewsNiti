import React from 'react';
function Loader() {
  return (
    <div 
      className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"
      role="status" 
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
export default Loader;