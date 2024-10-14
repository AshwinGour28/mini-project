import React, { useState, useEffect } from 'react';
import Ticket from '../components/Ticket'; // Adjust the path according to your folder structure
import '../styles/Bookings.css'; // Import CSS for styling

export default function Booking() {
  const [flightDetails, setFlightDetails] = useState(null);

  useEffect(() => {
    // Simulating fetching flight details from the previous component
    const selectedFlight = {
      flightId: 'AI2024',
      airline: 'Air India',
      departure: 'Delhi',
      destination: 'Mumbai',
      date: '2024-12-15',
      time: '10:30 AM',
      price: 5000,
      passengers: 2,
    };
    setFlightDetails(selectedFlight);
  }, []);

  return (
    <div className="booking-container">
      <h1 className="text-4xl font-bold text-white">Flight Booking</h1>
      {flightDetails ? (
        <Ticket flightDetails={flightDetails} />
      ) : (
        <p className="text-white">Loading flight details...</p>
      )}
    </div>
  );
}
