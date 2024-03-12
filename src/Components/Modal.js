import React from 'react';

const Modal = ({ isOpen, onClose, onSave, onClear }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <textarea placeholder="Enter cooking instructions..." />
        <div className="modal-buttons">
          <button onClick={onSave}>Save</button>
          <button onClick={onClear}>Clear</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
