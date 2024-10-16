import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Payment.css'; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Payment() {
  const location = useLocation();
  const [flight, setFlight] = useState(null);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { flightId, bookingId, passengerDetails } = location.state;
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

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/flight/get-flights?flightId=${flightId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const flightData = await res.json();
        if (!res.ok) {
          console.error('Failed to fetch flight data:', flightData.message);
          return;
        }
        if (flightData.flights && flightData.flights.length > 0) {
          const selectedFlight = flightData.flights[0];
          setFlight(selectedFlight);
        } else {
          console.error('No flights found in the response');
        }
      } catch (error) {
        console.error('Error fetching flight:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBooking = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/booking/get-bookings/?book_id=${bookingId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const bookingData = await res.json();
        if (!res.ok) {
          console.error('Failed to fetch booking data:', bookingData.message);
          return;
        }
        if (bookingData.bookings && bookingData.bookings.length > 0) {
          const selectedBooking = bookingData.bookings[0]; 
          setBooking(selectedBooking);
        } else {
          console.error('No bookings found in the response');
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
    fetchBooking();
  }, [flightId, bookingId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!flight || !booking) {
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

      <div className="passenger-details" ref={ticketRef}>
        <h3>Passenger Details</h3>

        <p><strong>First Name:</strong> {passengerDetails.f_name}</p>
        <p><strong>Last Name:</strong> {passengerDetails.l_name}</p>
        <p><strong>Email:</strong> {passengerDetails.email}</p>
        <p><strong>Phone:</strong> {passengerDetails.mob_no}</p>
        <p><strong>Aadhar Number:</strong> {passengerDetails.pass_no}</p>

      </div>

      

      <Link to={`/final-ticket/${bookingId}/${flightId}`}>
        <button className="payment-button">Proceed to Final Ticket</button>
      </Link>
    </div>
  );
}
