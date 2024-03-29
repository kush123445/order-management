import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import food from './food.jpg'; // Assuming this is the path to your image
import pizza from './pizza.jpg';
import bir from './bir.jpg';

const MyCarousel = ({ height }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleScroll = (e) => {
    const currentPosition = e.target.scrollTop;
    console.log(currentPosition);
    if (currentPosition <= 20) { // Check if scrolled within 20px from top
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
    <div
      onScroll={handleScroll}
      style={{ overflowY: 'scroll', position: 'relative' }}
    >
     
      <div> {/* Make the carousel sticky */}
        <Carousel animation="slide" duration="800" interval="5000" height={height ? "60px" : "240px"}>
        <div>
            <img src={pizza} alt="Tea" style={{ width: '100%' }} />
          </div>
          <div>
            <img src={food} alt="Tea" style={{ width: '100%' }} />
          </div>
          <div>
            <img src={bir} alt="Tea" style={{ width: '100%' }} />
          </div>
        </Carousel>
      </div>
    </div>
  </div>
  );
};

export default MyCarousel;
