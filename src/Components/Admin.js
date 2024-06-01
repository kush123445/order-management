// Sidebar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import your sidebar styles here
import { useNavigate } from 'react-router-dom';
import { WebSocketContext } from '../Wsc'; // Ensure the correct path
import { FaBell } from 'react-icons/fa'; // You might need to install react-icons if not already installed

const Sidebar = () => {
  const navigate = useNavigate();
  const { newOrdersCount, resetNewOrdersCount } = useContext(WebSocketContext);

  const handleOrdersClick = () => {
    resetNewOrdersCount();
    navigate('/orders');
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-heading">Admin Dashboard</h2>
      <ul className="sidebar-menu">
        <li>
        <Link to="/orders" onClick={handleOrdersClick}>
            Orders
            <span className="notification-bell">
              <FaBell className="bell-icon" />
              {newOrdersCount > 0 && (
                <span className="notification-count">{newOrdersCount}</span>
              )}
            </span>
          </Link>
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
          <li>
            <Link onClick={() => { localStorage.removeItem("auth"); navigate('/login'); }}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
