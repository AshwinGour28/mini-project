import React, { useState } from 'react';

export default function AddFlight() {
  // States for form inputs
  const [airline, setAirline] = useState('');
  const [dateOfJourney, setDateOfJourney] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState('');
  const [depTime, setDepTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [duration, setDuration] = useState('');
  const [totalStops, setTotalStops] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [price, setPrice] = useState('');
  const [flightID, setFlightID] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to submit form data to a backend or state management

    console.log({
      airline,
      dateOfJourney,
      source,
      destination,
      route,
      depTime,
      arrivalTime,
      duration,
      totalStops,
      additionalInfo,
      price,
      flightID,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Flight</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Airline */}
          <div>
            <label className="block text-gray-700">Airline</label>
            <input
              type="text"
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Date of Journey */}
          <div>
            <label className="block text-gray-700">Date of Journey</label>
            <input
              type="date"
              value={dateOfJourney}
              onChange={(e) => setDateOfJourney(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Source */}
          <div>
            <label className="block text-gray-700">Source</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-gray-700">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Route */}
          <div>
            <label className="block text-gray-700">Route</label>
            <input
              type="text"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Dep Time */}
          <div>
            <label className="block text-gray-700">Departure Time</label>
            <input
              type="time"
              value={depTime}
              onChange={(e) => setDepTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Arrival Time */}
          <div>
            <label className="block text-gray-700">Arrival Time</label>
            <input
              type="time"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-700">Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Total Stops */}
          <div>
            <label className="block text-gray-700">Total Stops</label>
            <input
              type="text"
              value={totalStops}
              onChange={(e) => setTotalStops(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Additional Info */}
          <div>
            <label className="block text-gray-700">Additional Info</label>
            <input
              type="text"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700">Price (in INR)</label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Flight ID */}
          <div>
            <label className="block text-gray-700">Flight ID</label>
            <input
              type="text"
              value={flightID}
              onChange={(e) => setFlightID(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add Flight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
