import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoo from '../images/logoo.avif'; // Ensure the path is correct
import '../styles/Payment.css';

export default function Payment() {
  const location = useLocation();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const { flightId, passengerDetails } = location.state;

  const ticketRef = useRef(); // Reference for the ticket div

  const generatePDF = async () => {
    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2, // Higher scale for better quality
      });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'pt', 'a4');
      const imgWidth = 208; // Width for A4 size
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height to maintain aspect ratio
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('e-ticket.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/flight/get-flights?flightId=${flightId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const flightData = await res.json();
        if (flightData.flights && flightData.flights.length > 0) {
          setFlight(flightData.flights[0]);
        } else {
          console.error('No flights found in the response');
        }
      } catch (error) {
        console.error('Error fetching flight:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [flightId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!flight) {
    return <div className="error-message">No data found</div>;
  }

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment Summary</h2>

      <div className="flight-details">
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

      <div className="passenger-details">
        <h3>Passenger Details</h3>
        <p><strong>First Name:</strong> {passengerDetails.f_name}</p>
        <p><strong>Last Name:</strong> {passengerDetails.l_name}</p>
        <p><strong>Email:</strong> {passengerDetails.email}</p>
        <p><strong>Phone:</strong> {passengerDetails.mob_no}</p>
        <p><strong>Aadhar Number:</strong> {passengerDetails.pass_no}</p>
      </div>

      {/* Ticket Preview Div */}
      <div ref={ticketRef} className="ticket-preview" style={{ display: 'none' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f0f8ff' }}>
          <img src={logoo} alt="Logo" style={{ width: '60px', height: '40px' }} />
          <h2 style={{ color: '#003366' }}>Jet Set Go</h2>
          <h3>E-Ticket</h3>
          <p><strong>Flight Number:</strong> {flight.flightId}</p>
          <p><strong>Airline:</strong> {flight.airline}</p>
          <p><strong>Route:</strong> {flight.route}</p>
          <p><strong>Departure:</strong> {flight.dep_time}</p>
          <p><strong>Arrival:</strong> {flight.arrival_time}</p>
          <p><strong>Source:</strong> {flight.source}</p>
          <p><strong>Destination:</strong> {flight.destination}</p>
          <p><strong>Price:</strong> ₹{flight.price}</p>
          <h3>Passenger Details</h3>
          <p><strong>First Name:</strong> {passengerDetails.f_name}</p>
          <p><strong>Last Name:</strong> {passengerDetails.l_name}</p>
          <p><strong>Email:</strong> {passengerDetails.email}</p>
          <p><strong>Phone:</strong> {passengerDetails.mob_no}</p>
          <p><strong>Aadhar Number:</strong> {passengerDetails.pass_no}</p>
        </div>
      </div>

      <button className="payment-button" onClick={generatePDF}>
        Proceed to Final Ticket
      </button>
    </div>
  );
}
