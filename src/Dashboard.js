import React from 'react';
 import './Dashboard.css';
import Qr from './Qr'; // Import Qr component
import Appp from './Orde'; // Import Appp component

function Dashboard() {
  return (
    <>
    <h1 className="title">HOTEL MANAGEMENT SYSTEM</h1>
    <div className="container">
      <div className="qr-container">
        <Qr />
      </div>
      <div className="appp-container">
        <Appp />
      </div>
    </div>
  </>
  );
}

export default Dashboard;
