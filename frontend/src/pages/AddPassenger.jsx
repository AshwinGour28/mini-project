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
        <div style={sectionTitle}>Traveller Details</div>
        <div style={subTitle}>ADULT 1</div>
        <input type="text" placeholder="First & Middle Name" style={inputField} />
        <input type="text" placeholder="Last Name" style={inputField} />
        <div style={genderStyle}>
          <label style={radioLabel}>
            <input type="radio" name="gender" /> Male
          </label>
          <label style={radioLabel}>
            <input type="radio" name="gender" /> Female
          </label>
        </div>
        <input type="text" placeholder="Mobile No (Optional)" style={inputField} />
        <input type="text" placeholder="Email (Optional)" style={inputField} />
        <button style={addTravellerButton}>+ ADD NEW ADULT</button>

        {/* Section 2 */}
        <h3 style={sectionTitle}>Booking details will be sent to</h3>
        <select style={inputField}>
          <option>India (+91)</option>
        </select>
        <input type="text" placeholder="Mobile No" style={inputField} />
        <input type="text" placeholder="Email" style={inputField} />
        <label style={gstCheckbox}>
          <input type="checkbox" /> I have a GST number (Optional)
        </label>

        {/* Fare Summary Section */}
        <div style={fareSummaryStyle}>
          <h4 style={fareSummaryTitle}>Fare Summary</h4>
          <p>Base Fare: ₹ 0</p>
          <p>Taxes and Surcharges: ₹ 0</p>
          <p>Total Amount: ₹ 0</p>
        </div>

        <div style={promoSection}>
          <input type="text" placeholder="Enter promo code here" style={inputField} />
          <button style={applyButton}>Apply</button>
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
  fontFamily: 'Arial, sans-serif', // Added global font-family
};

const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '30px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
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
  fontSize: '28px',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
};

const sectionTitle = {
  color: '#388e3c',
  fontSize: '20px',
  marginBottom: '15px',
};

const subTitle = {
  color: '#4caf50',
  fontSize: '18px',
  marginBottom: '10px',
};

const inputField = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
  fontSize: '16px',
};

const genderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '15px',
};

const radioLabel = {
  fontSize: '16px',
  cursor: 'pointer',
};

const addTravellerButton = {
  backgroundColor: '#ff5722',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s',
};

const addTravellerButtonHover = {
  backgroundColor: '#e64a19',
};

const fareSummaryStyle = {
  backgroundColor: '#ffecb3',
  padding: '15px',
  borderRadius: '8px',
  marginTop: '20px',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
};

const fareSummaryTitle = {
  color: '#388e3c',
  fontSize: '18px',
};

const promoSection = {
  marginTop: '20px',
  display: 'flex',
};

const applyButton = {
  backgroundColor: '#388e3c',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  marginLeft: '10px',
  transition: 'background-color 0.3s',
};

const gstCheckbox = {
  display: 'block',
  marginTop: '10px',
  fontSize: '16px',
};
