import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/FinalTicket.css'; // Import a CSS file for custom styling

export default function Ticket() {
  const location = useLocation();
  const { flight, passengerDetails } = location.state; // Getting flight and passenger details

  return (
    <div className="ticket-container">
      <div className="ticket-card">
        <h1 className="ticket-heading">E-Ticket</h1>

        {/* Flight Details */}
        <div className="ticket-section">
          <h3>Flight Details</h3>
          <p><strong>Flight Number:</strong> {flight.flightId}</p>
          <p><strong>Airline:</strong> {flight.airline}</p>
          <p><strong>Route:</strong> {flight.route}</p>
          <p><strong>Departure:</strong> {flight.dep_time}</p>
          <p><strong>Arrival:</strong> {flight.arrival_time}</p>
          <p><strong>Source:</strong> {flight.source}</p>
          <p><strong>Destination:</strong> {flight.destination}</p>
          <p><strong>Price:</strong> ₹{flight.price}</p>
        </div>

        {/* Passenger Details */}
        <div className="ticket-section">
          <h3>Passenger Details</h3>
          <p><strong>First Name:</strong> {passengerDetails.f_name}</p>
          <p><strong>Last Name:</strong> {passengerDetails.l_name}</p>
          <p><strong>Email:</strong> {passengerDetails.email}</p>
          <p><strong>Phone:</strong> {passengerDetails.mob_no}</p>
          <p><strong>Aadhar Number:</strong> {passengerDetails.pass_no}</p>
        </div>

        <button className="download-button">Download Ticket</button>
      </div>
    </div>
  );
}
