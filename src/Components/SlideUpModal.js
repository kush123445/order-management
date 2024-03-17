// SlideUpModal.js
import React, { useState } from 'react';
import './SlideUpModal.css';

const SlideUpModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>This is a slide-up modal!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SlideUpModal;
