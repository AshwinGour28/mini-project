import React, { useState } from 'react';
import '../styles/HomePage.css';


export default function Home() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travellers, setTravellers] = useState(1);
  const [fareType, setFareType] = useState('Regular');

  return (
    <div className="home-container">
      <header className="header">
        <h1>Travel Booking</h1>
      </header>

      <section className="booking-form">
        <div className="form-row">
          <label>From</label>
          <input 
            type="text" 
            value={from} 
            onChange={(e) => setFrom(e.target.value)} 
            placeholder="Delhi" 
          />
        </div>
        <div className="form-row">
          <label>To</label>
          <input 
            type="text" 
            value={to} 
            onChange={(e) => setTo(e.target.value)} 
            placeholder="Bengaluru" 
          />
        </div>
        <div className="form-row">
          <label>Departure</label>
          <input 
            type="date" 
            value={departure} 
            onChange={(e) => setDeparture(e.target.value)} 
          />
        </div>
        <div className="form-row">
          <label>Return</label>
          <input 
            type="date" 
            value={returnDate} 
            onChange={(e) => setReturnDate(e.target.value)} 
            placeholder="Optional" 
          />
        </div>
        <div className="form-row">
          <label>Travellers & Class</label>
          <input 
            type="number" 
            value={travellers} 
            onChange={(e) => setTravellers(e.target.value)} 
            min="1" 
          />
        </div>
        <div className="fare-options">
          <label>Select Fare:</label>
          <div className="fare-types">
            <button className={fareType === 'Regular' ? 'active' : ''} onClick={() => setFareType('Regular')}>
              Regular
            </button>
            <button className={fareType === 'Student' ? 'active' : ''} onClick={() => setFareType('Student')}>
              Student
            </button>
            <button className={fareType === 'Senior Citizen' ? 'active' : ''} onClick={() => setFareType('Senior Citizen')}>
              Senior Citizen
            </button>
          </div>
        </div>

        <button className="search-button">Search</button>
      </section>
    </div>
  );
}