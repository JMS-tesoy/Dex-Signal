"use client"; // This is required for forms and interactivity in Next.js App Router

import React, { useState } from 'react';

export default function CreateUserForm() {
  // 1. Set up state to hold the input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2. Create the function that runs when the form is submitted
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from refreshing
    setIsLoading(true);
    setStatusMessage('Submitting...');

    try {
      // 3. Send the POST request to your new API route
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, role: 'Trader' }), // Convert JS object to JSON
      });

      const data = await response.json();

      // 4. Handle the response based on the status codes we set up
      if (response.ok) {
        setStatusMessage('Success! User added to database.');
        setName(''); // Clear the form
        setEmail('');
      } else {
        setStatusMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatusMessage('Failed to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-900/30 backdrop-blur-md rounded-xl shadow-2xl border border-white/10">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">Create New User</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer w-full px-3 pt-5 pb-2 bg-white/5 border border-gray-700 rounded-md text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
            placeholder="Name"
            required
          />
          <label 
            htmlFor="name" 
            className="absolute left-3 top-1.5 text-xs font-semibold text-gray-400 transition-all pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-300 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-400"
          >
            Name
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full px-3 pt-5 pb-2 bg-white/5 border border-gray-700 rounded-md text-gray-100 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
            placeholder="Email"
            required
          />
          <label 
            htmlFor="email" 
            className="absolute left-3 top-1.5 text-xs font-semibold text-gray-400 transition-all pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-300 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-400"
          >
            Email
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating...' : 'Create User'}
        </button>
      </form>

      {/* Display success or error messages */}
      {statusMessage && (
        <p className="mt-4 text-center text-sm text-gray-300">
          {statusMessage}
        </p>
      )}
    </div>
  );
}