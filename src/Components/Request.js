import React, { useState } from 'react';
import { Container, Select, TextInput, Textarea,Button } from '@mantine/core';
import './RequestForm.css'; // Import custom CSS file
import { FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestForm = ({close,setTimelineData,timelineData}) => {
  const [name, setName] = useState('');
  const [queryType, setQueryType] = useState('');
  const [queryDescription, setQueryDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, for example, send data to server
    console.log('Form submitted with:', { name, queryType, queryDescription });
    setTimelineData([...timelineData, {
      date: "request Generated",
      orderAccepted: false
    }]);
    const toastId = toast('🔔 Request Generated !', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // Remove the toast notification after 5 seconds
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 5000);
  };

  return (
    <div className="background-container">
    <div className="request-form-container"> {/* Add class for container */}
    
      <Container size="sm">
    

        <form onSubmit={handleSubmit} className="request-form">
          <h2 className="form-title">Request Form</h2>
          <TextInput
            className="form-text-input"
            label="Your Name"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <Select
            className="form-select"
            label="Type of Query"
            placeholder="Select type"
            data={[
              { value: 'general', label: 'General Inquiry' },
              { value: 'technical', label: 'Technical Support' },
              { value: 'feedback', label: 'Feedback' },
              { value: 'other', label: 'Other' },
            ]}
            value={queryType}
            onChange={(value) => setQueryType(value)}
            required
          />
          <Textarea
            className="form-text-input"
            label="Query Description"
            placeholder="Enter your query here"
            value={queryDescription}
            onChange={(event) => setQueryDescription(event.target.value)}
            required
            multiline
            rows={5} // Set number of rows to 5
          />
          <Button  variant ='filled' type="submit" className="form-submit-button" style={{marginRight:'25px'}} >
            Submit
          </Button>
          <Button variant='light' style={{marginRight:'20px'}} onClick={close} className="form-submit-button">
            Cancel
          </Button>
        </form>
      </Container>
    </div>
    <ToastContainer />
    </div>
  );
};

export default RequestForm;
