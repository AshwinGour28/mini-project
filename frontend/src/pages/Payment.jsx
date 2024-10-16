import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

        setLoading(false);
      } catch (error) {
        console.error('Error fetching flight:', error);
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

        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking:', error);
        setLoading(false);
      }
    };


    fetchFlight();
    fetchBooking();
  }, [flightId, bookingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!flight || !booking) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <h2>Payment Summary</h2>

      {/* Display flight details */}
      <div>
        <h3>Flight Details</h3>
        <p>Flight Number: {flight.flightId}</p>
        <p>Airline: {flight.airline}</p>
        <p>Route: {flight.route}</p>
        <p>Departure: {flight.dep_time}</p>
        <p>Arrival: {flight.arrival_time}</p>
        <p>Source: {flight.source}</p>
        <p>Destination: {flight.destination}</p>
        <p>Price: ₹{flight.price}</p>
      </div>

      <button>Proceed to Payment</button>
    </div>
  );
}
