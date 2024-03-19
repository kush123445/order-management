import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import food from './food.jpg'; // Assuming this is the path to your image
import pizza from './pizza.jpg';
import bir from './bir.jpg';

const MyCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleScroll = (e) => {
    const currentPosition = e.target.scrollTop;
    setScrollPosition(currentPosition);
  };

  const handleScrollEnd = (e) => {
    const carouselHeight = e.target.scrollHeight - e.target.clientHeight;
    if (scrollPosition === carouselHeight) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        className="overlay"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: '1000',
        }}
      ></div>
    
      <div
        onScroll={handleScroll}
        onScrollEnd={handleScrollEnd}
        style={{ overflowY: 'scroll'}} // Adjust height accordingly
      >
        <Carousel animation="slide" duration="800" interval="5000" height="240px" >
          <div>
            <img src={food} alt="Tea" style={{ width: '100%' }} />
          </div>
          <div>
            <img src={pizza} alt="Tea" style={{ width: '100%' }} />
          </div>
          <div>
            <img src={bir} alt="Tea" style={{ width: '100%' }} />
          </div>
        </Carousel>
      </div>
      {showNavbar && (
        <div className="navbar" style={{ position: 'fixed', top: '0', width: '100%', backgroundColor: 'white' }}>
          {/* Your Navbar content */}
        </div>
      )}
    </div>
  );
};

export default MyCarousel;
