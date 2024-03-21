import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SplashScreen.css'; // Import CSS file for styling
import burger from './burger.png'
import { PropagateLoader
} from 'react-spinners';
import { css } from '@emotion/react';
import { TypeAnimation } from 'react-type-animation';

const SplashScreen = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to home page after 4 seconds
    const timeout = setTimeout(() => {
      navigate('/home'); // Replace '/home' with the path to your home page
    }, 4000);

    return () => clearTimeout(timeout); // Cleanup the timeout to prevent memory leaks
  }, [navigate]);
{/* <img src={burger} alt="Logo" className="logo" />


<div className="loader-container" style={{paddingLeft:'10px'}}>
  <PropagateLoader color={'#F98820'} loading={loading} size={30} />
</div> */}

  return (
    <div className="splash-screen">
    {/* White circle */}
    <div className="white-circle" style={{display:'flex', flexDirection:'column'}}>
    <img src={burger} alt="Logo" className="logo" />
    <div className="type-animation">
        <TypeAnimation
          sequence={[
            'Hot & Chill', // Types 'One'
            1000, // Waits 1s
            "tasty",1000
            
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{ fontSize: '1.5em', display: 'inline-block', fontFamily:'cursive' }}
        />
      </div>
 
    </div>
    
  </div>
  );
};

const override = css`
  display: block;
  margin: 0 auto;
`;

export default SplashScreen;
