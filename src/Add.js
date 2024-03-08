// Add.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Add() {
  const [platforms, setPlatforms] = useState([]);
  const [newPlatform, setNewPlatform] = useState({
    name: '',
    username: '',
    profileLink: '',
    comment: '', // New state for the short comment
  });
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const addPlatform = () => {
    if (!newPlatform.name || !newPlatform.profileLink) {
      setError('Platform name and profile link are required');
      return;
    }

    setPlatforms([...platforms, newPlatform]);
    setNewPlatform({
      name: '',
      username: '',
      profileLink: '',
      comment: '', // Reset the short comment when adding a new platform
    });
    setError('');
  };

  const removePlatform = (index) => {
    const updatedPlatforms = [...platforms];
    updatedPlatforms.splice(index, 1);
    setPlatforms(updatedPlatforms);
  };

  const copyToClipboard = () => {
    const textField = document.createElement('textarea');
    textField.innerText = generatedUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    document.body.removeChild(textField);
  };

  const generateQRCode = async () => {
    try {
      if (platforms.length === 0) {
        setError('Add at least one platform before generating the URL');
        return;
      }

      const response = await axios.post('https://yourlinklist.vercel.app/add-platforms', { platforms });

      setGeneratedUrl(response.data.url);
      setGeneratedUrl(response.data.url.replace('app/', 'app/fetch/'));

      setShowModal(true);
      setError('');
    } catch (error) {
      console.error('Error generating QR code', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Generate Your Link Tree</h1>
      {error && <div className="error-message" style={{color:'red'}}>{error}</div>}
      <div className="form">
        <label className="form-label">Platform Name:</label>
        <input
          type="text"
          className="form-input"
          value={newPlatform.name}
          onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
        />
      </div>
      <div className="form">
        <label className="form-label">Username:</label>
        <input
          type="text"
          className="form-input"
          value={newPlatform.username}
          onChange={(e) => setNewPlatform({ ...newPlatform, username: e.target.value })}
        />
      </div>
      <div className="form">
        <label className="form-label">Profile Link:</label>
        <input
          type="text"
          className="form-input"
          value={newPlatform.profileLink}
          onChange={(e) => setNewPlatform({ ...newPlatform, profileLink: e.target.value })}
        />
      </div>
      <div className="form">
        <label className="form-label">Short Comment:</label>
        <input
          type="text"
          className="form-input"
          value={newPlatform.comment}
          onChange={(e) => setNewPlatform({ ...newPlatform, comment: e.target.value })}
        />
      </div>
      <button className="btn-grad" onClick={addPlatform}>
        Add Platform
      </button>

      <h2 className="section-title">Platform List</h2>
      <ul className="platform-list">
        {platforms.map((platform, index) => (
          <li key={index} className="platform-item">
            <div className="platform-info">{platform.name}</div>
            <div className="platform-info">{platform.username}</div>
            <div className="platform-info" style={{color:"gray",fontStyle:"italic"}}>{platform.profileLink}</div>
            <div className="platform-info">{platform.comment}</div>
            <button className="btn-grad-r" onClick={() => removePlatform(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="section">
        <button className="btn-success" onClick={generateQRCode}>
          Generate URL
        </button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Generated URL</h2>
            <input
              type="text"
              className="url-input"
              value={generatedUrl}
              readOnly
            />
            <button className="btn-primary" onClick={copyToClipboard}>
              Copy URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Add;
