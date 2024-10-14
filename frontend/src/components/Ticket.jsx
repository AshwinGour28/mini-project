import React from 'react';
import '../styles/Ticket.css'; // Import CSS for styling

export default function Ticket({ flightDetails }) {
  return (
    <div className="ticket-container">
      <h2 className="text-3xl font-semibold text-gray-800">Ticket Details</h2>
      <div className="ticket-info">
        <div className="ticket-item">
          <span className="ticket-label">Flight ID:</span>
          <span className="ticket-value">{flightDetails.flightId}</span>
        </div>
        <div className="ticket-item">
          <span className="ticket-label">Airline:</span>
          <span className="ticket-value">{flightDetails.airline}</span>
        </div>
        <div className="ticket-item">
          <span className="ticket-label">From:</span>
          <span className="ticket-value">{flightDetails.departure}</span>
        </div>
        <div className="ticket-item">
          <span className="ticket-label">To:</span>
          <span className="ticket-value">{flightDetails.destination}</span>
        </div>
        <div className="ticket-item">
          <span className="ticket-label">Date:</span>
          <span className="ticket-value">{flightDetails.date}</span>
        </div>
        <div className="ticket-item">
          <span className="ticket-label">Time:</span>
          <span className="ticket-value">{flightDetails.time}</span>
        </div>
        <div className="ticket-item">
          <span className="ticket-label">Price:</span>
          <span className="ticket-value">₹{flightDetails.price}</span>
        </div>
        <div className="ticket-item">
          <span className="ticket-label">Passengers:</span>
          <span className="ticket-value">{flightDetails.passengers}</span>
        </div>
      </div>
      <button className="confirm-button">Confirm Booking</button>
    </div>
  );
}
