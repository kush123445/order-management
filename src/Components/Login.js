import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import './BusinessNameForm.css'; // Import your CSS file for styling
import { FaSpinner } from 'react-icons/fa'; // Import the spinner icon
import { BeatLoader } from 'react-spinners';
import logo from './flogo.png'

const BusinessNameForm = () => {
    const navigate = useNavigate();
  const [businessName, setBusinessName] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setBusinessName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation if needed

    // Simulate sending verification code (replace with actual logic)
    sendVerificationCode();
  };

  const sendVerificationCode = () => {
    setLoading(true); // Set loading to true when sending verification code
    setVerificationSent(true);
    // Simulate sending verification code
    // You can replace this with your actual logic to send the verification code to the registered email
    axios.post('http://localhost:8000/generateOrder')
      .then((response) => {
        // Handle successful response
        console.log('Order generated successfully');
       
        // Simulate a delay before showing verification code input
        setTimeout(() => {
          setVerificationSuccess(true);
          setLoading(false); // Set loading to false when verification code is sent
        },); // 2 seconds delay
      })
      .catch((error) => {
        // Handle error
        console.error('Error occurred while sending API request:', error);
        setLoading(false); // Set loading to false if there's an error
      });
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    // Perform validation if needed

    axios.post('http://localhost:8000/checkVerificationCode', { verificationCode })
    .then((response) => {
      // Assuming the response contains a 'success' property indicating if the verification code is correct
      if (response.data=="success") {
        // Navigate to the specified route upon successful verification
        localStorage.setItem("auth","success")
        navigate('/');

        
      } else {
        console.error('Incorrect verification code');
        // Handle incorrect verification code
      }
    })
    .catch((error) => {
      console.error('Error occurred while checking verification code:', error);
      // Handle error
    });

  };

  const handleVerificationChange = (e) => {
    setVerificationCode(e.target.value);
  };

  return (
<div className="page-container">
      <div className="background-banner"></div>
      <div className="verification-container">
        {!verificationSuccess ? (
          <div>
            <h2>Send Code to Login</h2>
            <form onSubmit={handleSubmit}>
              {/* Input field for business name */}
              {/* <input
                type="text"
                placeholder="Enter business name"
                value={businessName}
                onChange={handleChange}
                required
              /> */}
              {/* Conditional rendering for spinner loader */}
              {loading ? (
                <button type="submit" className="submit-button" disabled>
                  <BeatLoader color={'#fff'} size={10} /> {/* Spinner icon */}
                </button>
              ) : (
                <button type="submit" className="submit-button">Submit</button> 
              )}
            </form>
            {/* Display verification message if sent */}
            {verificationSent && (
              <p className="verification-message">
                Verification code has been sent to your registered email address.
              </p>
            )}
          </div>
        ) : (
          <div>
            <h2>Enter Verification Code</h2>
            <form onSubmit={handleVerificationSubmit}>
              {/* Input field for verification code */}
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={handleVerificationChange}
                className="verification-input"
                required
              />
              <button type="submit" className="submit-button">Submit</button> {/* Submit button */}
            </form>
          </div>
        )}
      </div>
      <img src={logo} alt="Top Right Image" className="top-right-image" />
    </div>
  );
};

export default BusinessNameForm;
