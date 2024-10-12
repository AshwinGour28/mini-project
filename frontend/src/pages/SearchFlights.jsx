import React, { useState, useEffect } from 'react';
import '../styles/SearchFlights.css'; // Make sure to import the CSS file

export default function SearchFlights() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [selectedFare, setSelectedFare] = useState(null);
  const [tripType, setTripType] = useState('One-way');
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // For animation

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for flights from ${fromCity} to ${toCity} on ${date} with return on ${returnDate} for ${passengers} passengers, Trip type: ${tripType}, Fare: ${selectedFare}`);
  };

  const cities = [
    'Allahabad', 'Bengaluru', 'Bhopal', 'Bhuj', 'Dehradun',
    'Delhi', 'Diu', 'Gorakhpur', 'Guwahati', 'Hyderabad',
    'Jabalpur', 'Jaipur', 'Jammu', 'Kanpur', 'Kochi',
    'Kolkata', 'Kullu', 'Mumbai', 'Patna', 'Pune',
    'Raipur', 'Ranchi', 'Shimla', 'Surat', 'Vijayawada',
    'Tezpur', 'Tirupati',
  ];

  const termsAndConditions = {
    Student: "Students must provide a valid student ID to avail the discount. This fare is only applicable for one-way flights.",
    "Senior Citizen": "Senior citizens must provide a valid ID showing their age to avail the discount. This fare is only applicable for round-trip flights.",
  };

  useEffect(() => {
    setIsVisible(true); // Trigger animation on mount
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-blue-100 p-4 ${isVisible ? 'slide-in' : ''}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <form onSubmit={handleSearch} className="grid grid-cols-2 gap-6">
          
          {/* Trip Type Section */}
          <div className="col-span-2">
            <label className="text-gray-700 text-lg font-semibold mb-2">Trip Type</label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tripType"
                  value="One-way"
                  checked={tripType === 'One-way'}
                  onChange={() => setTripType('One-way')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-lg">One-way</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tripType"
                  value="Round-trip"
                  checked={tripType === 'Round-trip'}
                  onChange={() => setTripType('Round-trip')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-lg">Round-trip</span>
              </label>
            </div>
          </div>

          {/* From Section */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-gray-700 text-lg font-semibold">From</label>
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>Select departure city</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* To Section */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-gray-700 text-lg font-semibold">To</label>
            <select
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>Select destination</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Departure Date */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-gray-700 text-lg font-semibold">Departure</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Return Date */}
          <div className={`col-span-2 md:col-span-1 ${tripType === 'One-way' ? 'opacity-50' : ''}`}>
            <label className="text-gray-700 text-lg font-semibold">Return</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={tripType === 'One-way'}
            />
          </div>

          {/* Passengers Section */}
          <div className="col-span-2">
            <label className="text-gray-700 text-lg font-semibold">Number of Passengers</label>
            <input
              type="number"
              min="1"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Special Fare Section */}
          <div className="col-span-2">
            <label className="text-gray-700 text-lg font-semibold mb-2">Select a special fare</label>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setSelectedFare('Regular')}
                className={`px-4 py-2 ${selectedFare === 'Regular' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 border border-blue-500'} rounded-md font-semibold`}
              >
                Regular
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedFare('Student');
                  setShowTooltip(false); // Hide tooltip on click
                }}
                onMouseEnter={() => setShowTooltip('Student')}
                onMouseLeave={() => setShowTooltip(false)}
                className={`relative px-4 py-2 ${selectedFare === 'Student' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 border border-blue-500'} rounded-md font-semibold`}
              >
                Student
                {showTooltip === 'Student' && (
                  <div className="absolute z-10 bg-white border border-gray-300 p-1 rounded-md shadow-md mt-1 text-xs w-40">
                    {termsAndConditions.Student}
                  </div>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedFare('Senior Citizen');
                  setShowTooltip(false); // Hide tooltip on click
                }}
                onMouseEnter={() => setShowTooltip('Senior Citizen')}
                onMouseLeave={() => setShowTooltip(false)}
                className={`relative px-4 py-2 ${selectedFare === 'Senior Citizen' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 border border-blue-500'} rounded-md font-semibold`}
              >
                Senior Citizen
                {showTooltip === 'Senior Citizen' && (
                  <div className="absolute z-10 bg-white border border-gray-300 p-1 rounded-md shadow-md mt-1 text-xs w-40">
                    {termsAndConditions['Senior Citizen']}
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            >
              Search 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
                }



