import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserPlusIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

const Register = () => {
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const register = await axios.post("http://localhost:3000/register", value);
      console.log(register.data);
      setErrorMessage(''); 
      navigate('/login'); 
    } catch (error) {
      console.error("Registration error:", error.response.data);
      setErrorMessage(error.response.data.message || 'Already user exists'); 
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
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
              Create Your Account
            </h2>
            <p className="text-gray-600 mt-1">Get started by filling out the form.</p>
          </div>

    
          <form onSubmit={handleSubmit} className="space-y-6">
            

            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                placeholder="Your Name"
                onChange={handleChange}
                value={value.name}
                name="name"
                required
      
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
    
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                placeholder="you@example.com"
                onChange={handleChange}
                value={value.email}
                name="email"
                required
                type="email"
                
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                onChange={handleChange}
                value={value.password}
                name="password"
                required
              
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 text-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

    
            {errorMessage && (
              <div className="text-center text-red-600 font-medium">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out hover:-translate-y-0.5"
            >
              <span className="mr-2">Create Account</span>
              <UserPlusIcon />
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <span
              className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              onClick={handleLoginRedirect}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;