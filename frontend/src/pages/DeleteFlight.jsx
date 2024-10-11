import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Adjust the import path as necessary

export default function DeleteFlight() {
  const [flightID, setFlightID] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = (e) => {
    e.preventDefault();

    if (!flightID) {
      setErrorMessage('Flight ID is required');
      return;
    }

    // Simulate API call for flight deletion
    console.log(`Deleting flight with ID: ${flightID}`);
    
    // Reset state after deletion
    setFlightID('');
    setErrorMessage('');
    setSuccessMessage(`Flight with ID ${flightID} has been deleted successfully.`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 to-pink-300"> 
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Delete Flight</h2>

          <form onSubmit={handleDelete} className="space-y-4">
            <div>
              <label className="block text-gray-700">Flight ID</label>
              <input
                type="text"
                value={flightID}
                onChange={(e) => setFlightID(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Flight ID"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700"
            >
              Delete Flight
            </button>

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
