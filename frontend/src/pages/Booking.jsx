import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Booking() {
  const [slideIn, setSlideIn] = useState(false);
  const [formData, setFormData] = useState({});
  const { flightId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSlideIn(true);
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value.trim()});
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/booking/add-booking/${flightId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
        return;
      }
      if(res.ok){
        console.log("Passenger added successfull")
        navigate(`/payment/${data.book_id}/${flightId}`, {state: {bookingId: data.book_id, flightId: String(flightId)}});
        
      }
    } catch (error) {
      console.log(data.message);
    }
  }

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit}>
      <div style={{ ...containerStyle, ...(slideIn ? slideInStyle : {}) }}>
        {/* Section 1 */}
        <h2 style={headingStyle}>Complete your booking</h2>
        <div style={{ marginTop: '20px', color: '#388e3c', fontWeight: 'bold' }}>Traveller Details</div>
        <div style={{ color: '#4caf50', fontWeight: 'bold', marginBottom: '10px' }}>ADULT 1</div>
        <input onChange={handleChange} id='f_name' type="text" placeholder="First & Middle Name" style={inputStyle} />
        <input onChange={handleChange} id='l_name' type="text" placeholder="Last Name" style={inputStyle} />
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0' }}>
          <label>
            <input onChange={handleChange} id='gender' type="radio" name="gender" value='male' /> Male
          </label>
          <label>
            <input onChange={handleChange} id='gender' type="radio" name="gender" value='female' /> Female
          </label>  
        </div>
        <input onChange={handleChange} id='mob_no' type="text" placeholder="Mobile No" style={inputStyle} />
        <input onChange={handleChange} id='email' type="text" placeholder="Email" style={inputStyle} />
        <input onChange={handleChange} id='pass_no' type="text" placeholder="Passport Number" style={inputStyle} />
        <button style={buttonStyle}>+ ADD NEW ADULT</button>
        
        {/* Fare Summary Section */}
        <div style={fareSummaryStyle}>
          <h4 style={{ color: '#388e3c' }}>Fare Summary</h4>
          <p>Base Fare: ₹ 0</p>
          <p>Taxes and Surcharges: ₹ 0</p>
          <p>Total Amount: ₹ 0</p>
        </div>
        
        <div className='flex flex-row justify-center items-center mt-4'>
        <button type='submit' style={{ ...buttonStyle, marginLeft: '10px', marginTop: '10px'  }}>Proceed to payment</button>
        </div>
      </div>
      </form>
    </div>
  );
}

const pageStyle = {
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
};

const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
  opacity: 0,  // Initial opacity set to 0
  transform: 'translateY(50px)',  // Initial position (slightly below)
  transition: 'all 0.5s ease-out',  // Transition for smooth slide-in
};

const slideInStyle = {
  opacity: 1,  // Visible after animation
  transform: 'translateY(0)',  // Moves to its original position
};

const headingStyle = {
  textAlign: 'center',
  color: '#ff5722',
  fontSize: '2em',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  fontFamily: "'Poppins', sans-serif",
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '8px 0',
  boxSizing: 'border-box',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  backgroundColor: '#ff5722',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const fareSummaryStyle = {
  backgroundColor: '#ffecb3',
  padding: '10px',
  borderRadius: '8px',
  marginTop: '20px',
};
