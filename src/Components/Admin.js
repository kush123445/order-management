import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import your sidebar styles here
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div className="sidebar">
      <h2 className="sidebar-heading">Admin Dashboard</h2>
      <ul className="sidebar-menu">
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/tables">Tables</Link>
        </li>
        <li>
          <Link to="/Menu">Menu</Link>
        </li>
        <li>
          <Link to="/qr">Qr-Code</Link>
        </li>
        <li>
          <Link to="/request">Request</Link>
        </li>
        {/* Add more links for other sections as needed */}
      </ul>
      {/* Account Information */}
      <div className="account-info">
        <h3 className="account-heading">Account </h3>
        <ul className="account-menu">
          {/* <li>
            <Link to="/profile">Profile</Link>
          </li> */}
         
          <li>
            <Link onClick={()=>{localStorage.removeItem("auth");  navigate('/login');}}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
