import React from 'react';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Notifications({ message, type }) {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed top-24 right-6 w-auto max-w-sm z-50">
      <div 
        className={`flex items-center p-4 rounded-lg shadow-lg text-white
          ${isSuccess ? 'bg-emerald-600' : 'bg-red-600'}`}
      >
        <FontAwesomeIcon icon={isSuccess ? faCheckCircle : faExclamationCircle} className="text-xl" />
        <p className="ml-3 font-semibold">{message}</p>
      </div>
    </div>
  );
}

export default Notifications;