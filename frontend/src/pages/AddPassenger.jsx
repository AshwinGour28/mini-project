import React, { useEffect, useState } from 'react';

export default function AddPassenger() {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    // Trigger the slide-in animation when the component is mounted
    setSlideIn(true);
  }, []);

  return (
    <div style={pageStyle}>
      <div style={{ ...containerStyle, ...(slideIn ? slideInStyle : {}) }}>
        {/* Section 1 */}
        <h2 style={headingStyle}>Complete your booking</h2>
        <div style={{ marginTop: '20px', color: '#388e3c', fontWeight: 'bold' }}>Traveller Details</div>
        <div style={{ color: '#4caf50', fontWeight: 'bold', marginBottom: '10px' }}>ADULT 1</div>
        <input type="text" placeholder="First & Middle Name" style={inputStyle} />
        <input type="text" placeholder="Last Name" style={inputStyle} />
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0' }}>
          <label>
            <input type="radio" name="gender" /> Male
          </label>
          <label>
            <input type="radio" name="gender" /> Female
          </label>
        </div>
        <input type="text" placeholder="Mobile No (Optional)" style={inputStyle} />
        <input type="text" placeholder="Email (Optional)" style={inputStyle} />
        <button style={buttonStyle}>+ ADD NEW ADULT</button>
        
        {/* Section 2 */}
        <h3 style={{ marginTop: '30px', color: '#388e3c' }}>Booking details will be sent to</h3>
        <select style={inputStyle}>
          <option>India (+91)</option>
        </select>
        <input type="text" placeholder="Mobile No" style={inputStyle} />
        <input type="text" placeholder="Email" style={inputStyle} />
        <label style={{ display: 'block', marginTop: '10px' }}>
          <input type="checkbox" /> I have a GST number (Optional)
        </label>
        
        {/* Fare Summary Section */}
        <div style={fareSummaryStyle}>
          <h4 style={{ color: '#388e3c' }}>Fare Summary</h4>
          <p>Base Fare: ₹ 0</p>
          <p>Taxes and Surcharges: ₹ 0</p>
          <p>Total Amount: ₹ 0</p>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <input type="text" placeholder="Enter promo code here" style={inputStyle} />
          <button style={{ ...buttonStyle, marginLeft: '10px' }}>Apply</button>
        </div>
      </div>
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
