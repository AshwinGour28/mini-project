import React, { useState, useEffect } from 'react';

export default function UpdateFlight() {
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
  const [existingFlight, setExistingFlight] = useState(null); // For fetching flight details

  // Function to simulate fetching flight data based on Flight ID
  const fetchFlightData = (flightID) => {
    // Simulate fetching data. Replace this with an actual API call
    const flightData = {
      airline: 'IndiGo',
      dateOfJourney: '2024-12-24',
      source: 'Hyderabad',
      destination: 'Bengaluru',
      route: 'Hyderabad → Tirupati → Bengaluru',
      depTime: '07:23',
      arrivalTime: '04:23',
      duration: '12h 32m',
      totalStops: '1 stop',
      additionalInfo: 'In-flight meal not included',
      price: '13449',
      flightID: '61D1734C',
    };
    setExistingFlight(flightData);
  };

  // Fetch flight details when the Flight ID is provided
  useEffect(() => {
    if (flightID) {
      fetchFlightData(flightID);
    }
  }, [flightID]);

  // Populate the form fields with fetched flight data
  useEffect(() => {
    if (existingFlight) {
      setAirline(existingFlight.airline);
      setDateOfJourney(existingFlight.dateOfJourney);
      setSource(existingFlight.source);
      setDestination(existingFlight.destination);
      setRoute(existingFlight.route);
      setDepTime(existingFlight.depTime);
      setArrivalTime(existingFlight.arrivalTime);
      setDuration(existingFlight.duration);
      setTotalStops(existingFlight.totalStops);
      setAdditionalInfo(existingFlight.additionalInfo);
      setPrice(existingFlight.price);
    }
  }, [existingFlight]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to submit updated data to the backend or state management

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
        <h2 className="text-2xl font-semibold text-center mb-6">Update Flight</h2>

        {/* Flight ID Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Airline */}
          <div>
            <label className="block text-gray-700">Airline</label>
            <input
              type="text"
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={!existingFlight} // Disabled until flight data is fetched
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
              disabled={!existingFlight}
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
              disabled={!existingFlight}
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
              disabled={!existingFlight}
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
              disabled={!existingFlight}
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
              disabled={!existingFlight}
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
              disabled={!existingFlight}
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
              disabled={!existingFlight}
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
              disabled={!existingFlight}
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
              disabled={!existingFlight}
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
              disabled={!existingFlight}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={!existingFlight}
            >
              Update Flight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
