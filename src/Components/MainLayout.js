import React, { useEffect } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './Admin';
import './MainLayout.css'; // Import your main layout styles here

const MainLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if authentication is successful
    const authStatus = localStorage.getItem('auth');
    if (authStatus !== 'success') {
      // If authentication is not successful, navigate to login route
      navigate('/login');
    }
  }, [location, navigate]);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/orders':
        return 'Welcome to Orders';
      case '/inventory':
        return 'Welcome to Inventory';
      case '/customers':
        return 'Welcome to Customers';
      default:
        return 'Welcome to Your Admin Dashboard';
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        <h1>{getPageTitle()}</h1>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
