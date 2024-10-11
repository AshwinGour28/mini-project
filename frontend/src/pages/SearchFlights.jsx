import React, { useState } from 'react';

export default function SearchFlights() {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log(`Searching for flights to ${destination} on ${date}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-500">
      <h1 className="text-5xl font-bold text-white mb-8">Search Flights</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <form onSubmit={handleSearch} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg">Destination</label>
            <input
              type="text"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-lg">Travel Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-blue-700"
          >
            Search Flights
          </button>
        </form>
      </div>
    </div>
  );
}
