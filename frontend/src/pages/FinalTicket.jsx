import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../styles/FinalTicket.css'; // Assume you have a separate CSS for styling

export default function FinalTicket() {
  const location = useLocation();
  const { flight, passengerDetails } = location.state; 
  const ticketRef = useRef();

  const generatePDF = () => {
    const ticket = ticketRef.current;
    ticket.classList.add('capture-pdf'); 

    html2canvas(ticket, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('e-ticket.pdf');
      ticket.classList.remove('capture-pdf');
    });
  };

  if (!flight || !passengerDetails) {
    return <div className="error-message">No data found</div>;
  }

  return (
    <div className="ticket-container" ref={ticketRef}>
      <h1 className="ticket-title">Jet Set Go E-Ticket</h1>

      <div className="flight-info">
        <div className="flight-header">
          <h2>{flight.source} to {flight.destination}</h2>
          <h3>{flight.airline} ({flight.flightId})</h3>
        </div>

        <div className="flight-time">
          <div className="departure">
            <h4>Departure</h4>
            <p>{flight.source} - {flight.dep_time}</p>
          </div>
          <div className="arrival">
            <h4>Arrival</h4>
            <p>{flight.destination} - {flight.arrival_time}</p>
          </div>
        </div>
      </div>

      <div className="passenger-info">
        <h3>Passenger Information</h3>
        <ul>
          {passengerDetails.map((passenger, index) => (
            <li key={index}>
              {index + 1}. {passenger.f_name} {passenger.l_name}, {passenger.pass_no}
            </li>
          ))}
        </ul>
      </div>

      <button className="download-pdf" onClick={generatePDF}>Download E-Ticket</button>
    </div>
  );
}
