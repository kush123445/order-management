// src/components/PlatformSetDetail.js
import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import './Fetch.css'; // Import the CSS file for styling
import { FaLink } from 'react-icons/fa';

const PlatformSetDetail = () => {
  const { id } = useParams();
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get(`https://yourlinklist.vercel.app/platforms/${id}`);
        setPlatforms(response.data);
      } catch (error) {
        console.error('Error fetching platforms:', error);
      }
    };

    fetchPlatforms();
  }, [id]);

  return (
    <div className="card-list">
      {platforms.map((platform) => (
        <div key={platform._id} className="card">
         
          <div className="card-content">
            <p className="platform-name" style={{color:"black"}}>{platform.name}</p>
            <p>{platform.description}</p>
            <ul>
              <li className="username-list-item">Username: {platform.username}</li>
              <li className="" style={{ fontFamily: 'Tahoma, Verdana, sans-serif'}}> {platform.comment}</li>
             
              <li className="profile-link">
                <Link to={platform.profileLink} target="_blank" rel="noopener noreferrer">
                  Profile Link <FaLink className="link-icon" />
                </Link>
              </li>
            </ul>
          </div>
            
        </div>
        
      ))}
    </div>
  );
};

export default PlatformSetDetail;
