import React, { useState } from 'react';

export default function AddFlight() {
  const [flightDetails, setFlightDetails] = useState({
    flightNumber: '',
    departure: '',
    arrival: '',
    date: '',
    time: '',
    airline: '',
    gate: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightDetails({ ...flightDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: Check if fields are not empty
    if (!flightDetails.flightNumber || !flightDetails.departure || !flightDetails.arrival || !flightDetails.date || !flightDetails.time || !flightDetails.airline || !flightDetails.gate) {
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
      time: '',
      airline: '',
      gate: '',
    });
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-pink-300 p-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Flight</h2>
        <form onSubmit={handleSubmit}>
          {/* Flight Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              value={flightDetails.flightNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Departure */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Departure</label>
            <input
              type="text"
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
              type="text"
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

          {/* Time */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Time</label>
            <input
              type="time"
              name="time"
              value={flightDetails.time}
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

          {/* Gate */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Gate</label>
            <input
              type="text"
              name="gate"
              value={flightDetails.gate}
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
  );
}
