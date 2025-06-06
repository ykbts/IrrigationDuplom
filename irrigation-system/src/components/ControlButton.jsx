import React from 'react';

const ControlButton = ({ label, onClick }) => (
  <button
    style={{
      border: '1px solid #BDBDC6',
      borderRadius: '14px',
      padding: '0 16px',
      width: 297,
      height: 97,
      backgroundColor: 'rgba(255,255,255,0.9)',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '50px',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: '6px',
      transition: 'background-color 0.3s, color 0.3s', // Smooth transition for hover effect
    }}
    onClick={onClick}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = '#121212';
      e.target.style.color = '#fff';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = 'rgba(255,255,255,0.9)';
      e.target.style.color = 'black'; // Default color
    }}
  >
    {label}
  </button>
);

export default ControlButton;
