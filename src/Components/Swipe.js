import React, { useState } from 'react';
import './SwipeButton.css';
import { FaArrowRight } from 'react-icons/fa';

const SwipeButton = ({ onSwipe }) => {
  const [swiped, setSwiped] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const handleSwipeStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleSwipeMove = (e) => {
    setCurrentX(e.touches[0].clientX);
  };

  const handleSwipeEnd = () => {
    const deltaX = currentX - startX;
    if (deltaX > 50) {
      setSwiped(true);
      onSwipe();
    }
    setCurrentX(0);
  };

  const ballSize = {
    width: '60%',
    height: '100%',
  };

  const ballStyle = {
    ...ballSize,
    backgroundColor: swiped ? '#4caf50' : '#f44336',
    transform: `translateX(${currentX - startX}px)`,
  };

  const buttonStyle = {
    backgroundColor: swiped ? (currentX - startX > 50 ? '#4caf50' : '#f44336') : '#2196f3',
  };

  return (
    <div
      className={`swipe-button ${swiped ? 'swiped' : ''}`}
      onTouchStart={handleSwipeStart}
      onTouchMove={handleSwipeMove}
      onTouchEnd={handleSwipeEnd}
      style={buttonStyle}
    >
      <div className="ball" style={ballStyle}></div>
      <FaArrowRight className="arrow" />
      Swipe to Submit
    </div>
  );
};

export default SwipeButton;
