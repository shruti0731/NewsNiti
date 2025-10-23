import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to toggle authentication for demonstration
  const toggleAuthentication = () => {
    setIsAuthenticated((prev) => !prev);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, toggleAuthentication }}>
      {children}
    </UserContext.Provider>
  );
};
