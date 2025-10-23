import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! Thank you.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12 px-4">
      <h1 className="text-4xl font-bold text-indigo-700 mb-2">Contact Us</h1>
      <p className="text-indigo-600 mb-8 text-center max-w-xl">
        We'd love to hear from you! Send us your feedback, queries, or suggestions.
      </p>

      <form 
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-700 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-800 transition-colors"
        >
          Send Message
        </button>
      </form>

      <div className="mt-8 text-center text-indigo-600 space-y-1">
        <p>Email: <a href="mailto:support@newsniti.com" className="hover:underline">support@newsniti.com</a></p>
        <p>Follow us on 
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="ml-1 hover:underline">Twitter</a>, 
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="ml-1 hover:underline">Facebook</a>
        </p>
      </div>
    </div>
  );
}

export default Contact;