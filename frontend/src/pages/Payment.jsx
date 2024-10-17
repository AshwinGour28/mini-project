import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Payment.css'; // Import your CSS file

export default function Payment() {
  const location = useLocation();
  const [flight, setFlight] = useState(null);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { flightId, bookingId } = location.state;

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

      {/* Display flight details */}
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

      {/* Display passenger details */}
      <div className="passenger-details">
        <h3>Passenger Details</h3>
        <p><strong>Name:</strong> {booking.f_name} {booking.l_name}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Phone:</strong> {booking.mob_no}</p>
      </div>
    <Link to='/ticket-downloadable' >
      <button className="payment-button">Proceed to Payment</button>
      </Link>
    </div>
  );
}
