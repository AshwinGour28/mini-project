import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component

export default function AddFlight() {
  const [flightDetails, setFlightDetails] = useState({});

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFlightDetails({ ...flightDetails, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: Check if fields are not empty
    if (!flightDetails.flightNumber || !flightDetails.departure || !flightDetails.arrival || !flightDetails.date || !flightDetails.time || !flightDetails.airline || !flightDetails.route || !flightDetails.numberOfStops || flightDetails.price) {
      setErrorMessage('All fields are required');
      return;
    }

    // You can send the flightDetails object to the backend via an API call here
    console.log('Flight details submitted:', flightDetails);

    // Clear the form and error message upon successful submission
    setFlightDetails({
      flightNumber: '',
      departure: '',
      arrival: '',
      date: '',
      airline: '',
      route: '',
      numberOfStops: '',
      source: '',
      destination: '',
    });
    setErrorMessage('');
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
                name="flightNumber"
                value={flightDetails.flightNumber}
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
                name="airline"
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
                name="source"
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
                name="destination"
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
                name="departure"
                value={flightDetails.departure}
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
                name="arrival"
                value={flightDetails.arrival}
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
                name="date"
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
                name="route"
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
                name="numberOfStops"
                value={flightDetails.numberOfStops}
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
                name="numberOfStops"
                value={flightDetails.numberOfStops}
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
