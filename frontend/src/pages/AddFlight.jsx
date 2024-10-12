import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component

export default function AddFlight() {
  const [flightDetails, setFlightDetails] = useState({});

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFlightDetails({ ...flightDetails, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!flightDetails.flightId || !flightDetails.airline || !flightDetails.source || !flightDetails.destination || !flightDetails.dep_time || !flightDetails.arrival_time || !flightDetails.date || !flightDetails.route || !flightDetails.no_of_stops || !flightDetails.price) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/flight/add-flight', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(flightDetails),
      });
      const data = await res.json();
      if(!res.ok){
        setErrorMessage(data.message);
        return;
      }
      if(res.ok){
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* Sidebar for navigation */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-r from-purple-100 to-pink-300">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Flight</h2>
          <form onSubmit={handleSubmit}>
            {/* Flight Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Flight ID</label>
              <input
                type="text"
                id="flightId"
                value={flightDetails.flightId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Airline */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Airline</label>
              <input
                type="text"
                id='airline'
                value={flightDetails.airline}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Source */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Source</label>
              <input
                type="text"
                id='source'
                value={flightDetails.source}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Destination */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Destination</label>
              <input
                type="text"
                id='destination'
                value={flightDetails.destination}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Departure */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Departure</label>
              <input
                type="time"
                id='dep_time'
                value={flightDetails.dep_time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Arrival */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Arrival</label>
              <input
                type="time"
                id='arrival_time'
                value={flightDetails.arrival_time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Date</label>
              <input
                type="date"
                id='date'
                value={flightDetails.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>


            {/* Route */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Route</label>
              <input
                type="text"
                id='route'
                value={flightDetails.route}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Number of Stops */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Number of Stops</label>
              <input
                type="number"
                id='no_of_stops'
                value={flightDetails.no_of_stops}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Price</label>
              <input
                type="number"
                id='price'
                value={flightDetails.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              Add Flight
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
