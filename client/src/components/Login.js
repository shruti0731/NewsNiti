import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LockIcon = () => (
  <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: username,
        password,
      });

      if (response.data.success) {
        const userData = response.data.user; 
        const userd = {
          email: userData.email,
          name: userData.name
        }
        
        onLogin(userd); 
        navigate('/allnews');
      } else {
        setError(response.data.message); 
      }
    } catch (error) {
      setError('An error occurred, please try again.'); 
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
 
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
      
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-indigo-700">
              NewsNiti
            </h1>
            <h2 className="text-3xl font-bold text-indigo-900 mt-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-1">Please login to your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="text"
                placeholder="you@example.com"
                required
               
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

      
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
            
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-center text-red-600 font-medium">
                {error}
              </div>
            )}

      
            <button
              type="submit"
           
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out hover:-translate-y-0.5"
            >
              <span className="mr-2">Login</span>
              <LockIcon />
            </button>
          </form>

     
          <p className="mt-8 text-center text-sm text-gray-600">
            Not Registered?{' '}
            <span
          
              className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              onClick={handleRegisterRedirect}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;