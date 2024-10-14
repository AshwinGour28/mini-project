import React, { useState, useEffect } from 'react';
import '../styles/SearchFlights.css'; // Ensure to modify this CSS file
import { useLocation, useNavigate } from 'react-router-dom';
import FlightCard from '../components/FlightCard';

export default function SearchFlight() {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    date: '',
    no_of_passengers: '',
  });

  const location = useLocation();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [tripType, setTripType] = useState('One-way');
  const [isVisible, setIsVisible] = useState(false); // For animation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const queryParams = {};
    if (formData.source) queryParams.source = formData.source;
    if (formData.destination) queryParams.destination = formData.destination;
    if (formData.date) queryParams.date = formData.date;
    if (formData.no_of_passengers) queryParams.no_of_passengers = formData.no_of_passengers;

    const query = new URLSearchParams(queryParams).toString();
    navigate(`/searchflights/?${query}`);

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/flight/get-flights?${query}`);
      if (!response.ok) {
        setLoading(false);
        return;
      }
      const data = await response.json();
      setFlights(data);
      setLoading(false);
      setShowMore(data.flights.length > 9);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  useEffect(() => {
    setIsVisible(true); // Trigger animation on mount
  }, []);

  const cities = ['Allahabad', 'Bengaluru', 'Bhopal', 'Bhuj', 'Dehradun', 'Delhi', 'Diu', 'Gorakhpur', 'Guwahati', 'Hyderabad', 'Jabalpur', 'Jaipur', 'Jammu', 'Kanpur', 'Kochi', 'Kolkata', 'Kullu', 'Mumbai', 'Patna', 'Pune', 'Raipur', 'Ranchi', 'Shimla', 'Surat', 'Vijayawada', 'Tezpur', 'Tirupati'];

  return (
    <div className={`search-flights-container flex flex-col items-center justify-center p-4 ${isVisible ? 'slide-in' : ''}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <form onSubmit={handleSearch} className="grid grid-cols-2 gap-6">
          {/* Trip Type Section */}
          <div className="col-span-2">
            <label className="text-gray-700 text-lg font-semibold mb-2">Trip Type</label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="One-way"
                  checked={tripType === 'One-way'}
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
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-lg">Round-trip</span>
              </label>
            </div>
          </div>

          {/* From Section */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-gray-700 text-lg font-semibold">From</label>
            <select id="source" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="" disabled>
                Select departure city
              </option>
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
            <select id="destination" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="" disabled>
                Select destination
              </option>
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
            <input id="date" type="date" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>

          {/* Passengers Section */}
          <div className="col-span-2">
            <label className="text-gray-700 text-lg font-semibold">Number of Passengers</label>
            <input id="no_of_passengers" onChange={handleChange} type="number" min="1" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button onClick={handleSearch} type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300">
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col mb-5 w-full">
        {flights.flights && Array.isArray(flights.flights) && flights.flights.length > 0 ? (
          flights.flights.map((flight) => <FlightCard key={flight.flightId} flight={flight} />)
        ) : (
          <p className="text-3xl mt-8 text-center">No flights available</p>
        )}
      </div>
    </div>
  );
}
