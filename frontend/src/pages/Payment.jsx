import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoo from '../images/logoo.avif'; // Correct logo path
import '../styles/Payment.css';

export default function Payment() {
  const location = useLocation();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const { flightId, passengerDetails } = location.state;

  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'pt', 'a4');

    // Set Background Color
    pdf.setFillColor(240, 248, 255); // Light background color
    pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F');

    // Add Logo
    const imgData = await getBase64(logoo);
    pdf.addImage(imgData, 'AVIF', 20, 20, 60, 40); // Logo position and size

    // Add Title
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 51, 102); // Dark blue color
    pdf.text('Jet Set Go', 100, 50); // Title position

    // Flight Details
    pdf.setFontSize(24);
    pdf.text('E-Ticket', 40, 100);
    
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0); // Black text
    pdf.text(`Flight Number: ${flight.flightId}`, 40, 130);
    pdf.text(`Airline: ${flight.airline}`, 40, 150);
    pdf.text(`Route: ${flight.route}`, 40, 170);
    pdf.text(`Departure: ${flight.dep_time}`, 40, 190);
    pdf.text(`Arrival: ${flight.arrival_time}`, 40, 210);
    pdf.text(`Source: ${flight.source}`, 40, 230);
    pdf.text(`Destination: ${flight.destination}`, 40, 250);
    pdf.text(`Price: ₹${flight.price}`, 40, 270);

    // Passenger Details
    pdf.setFontSize(20);
    pdf.text('Passenger Details', 40, 300);
    pdf.setFontSize(16);
    pdf.text(`First Name: ${passengerDetails.f_name}`, 40, 320);
    pdf.text(`Last Name: ${passengerDetails.l_name}`, 40, 340);
    pdf.text(`Email: ${passengerDetails.email}`, 40, 360);
    pdf.text(`Phone: ${passengerDetails.mob_no}`, 40, 380);
    pdf.text(`Aadhar Number: ${passengerDetails.pass_no}`, 40, 400);

    // Save PDF
    pdf.save('e-ticket.pdf');
  };

  // Function to convert AVIF to base64
  const getBase64 = (img) => {
    return new Promise((resolve, reject) => {
      const imgElement = new Image();
      imgElement.src = img;
      imgElement.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        ctx.drawImage(imgElement, 0, 0);
        resolve(canvas.toDataURL('image/png')); // Use PNG for better compatibility
      };
      imgElement.onerror = reject;
    });
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

      <button className="payment-button" onClick={generatePDF}>
        Proceed to Final Ticket
      </button>
    </div>
  );
}
