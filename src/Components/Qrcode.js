import React, { useRef, useState } from 'react';
import QRCode from 'qrcode.react';
import './Qrcode.css';
import { AiOutlineClose } from 'react-icons/ai';

const Qr = () => {
  const qrCodeRef = useRef(null);
  const [url, setUrl] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      const qrCodeElement = qrCodeRef.current.firstChild;
      const qrCodeWidth = qrCodeElement.offsetWidth * 3;
      const qrCodeHeight = qrCodeElement.offsetHeight * 3;

      const canvas = document.createElement('canvas');
      canvas.width = qrCodeWidth + 200;
      canvas.height = qrCodeHeight + 200;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const qrCodeX = (qrCodeWidth - qrCodeElement.offsetWidth) / 2;
      const qrCodeY = 0;

      ctx.drawImage(qrCodeElement, qrCodeX - 40, qrCodeY + 50, qrCodeWidth, qrCodeHeight);

      ctx.font = '24px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText('Please Scan this QR code to Open Menu & Enjoy', qrCodeWidth / 2 + 100, qrCodeHeight + 85);
      ctx.fillText('Powered & Developed by CK developers', qrCodeWidth / 2 + 80, qrCodeHeight + 110);

      const qrCodeImage = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = qrCodeImage;
      link.download = 'qrcode_with_text.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setUrl('');
      setShowQRCode(false)
    }
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    setIsValidUrl(true);
    setShowQRCode(false)
  };

  const handleGenerateQR = () => {
    if (!url) {
      setIsValidUrl(false);
      return;
    }
    setShowQRCode(true);
    setShowQRCode(true)
    setUrl(url);
  };

  const handleClearInput = () => {
    setUrl('');
    setShowQRCode(false);
    setIsValidUrl(true);
  };

  const handleHideQRCode = () => {
    setUrl('');
    setIsValidUrl(true);
    setShowQRCode(false);
  };

  return (
    <div className="scan-container">
      <div className="background-image"></div>
      <h2 className="heading">Generate QR Code</h2>
      <div className="input-container">
        <div>
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter URL"
            className={`url-input ${!isValidUrl ? 'error' : ''}`}
          />
          {!isValidUrl && <p className="error-text">Please enter a valid URL</p>}
        </div>
        <button onClick={handleHideQRCode} className="close-btn">
          <AiOutlineClose />
        </button>
      </div>
      <button
        onClick={handleGenerateQR}
        className={`generate-btn ${!url ? 'disabled' : ''}`}
        disabled={!url}
      >
        Generate QR Code
      </button>
      {showQRCode && url!='' && (
        <>
          <div ref={qrCodeRef} className="qrcode-container">
            <QRCode value={url} />
          </div>
          <p className="instructions">Scan the QR code to open the URL</p>
          <button onClick={downloadQRCode} className="download-btn">
            Download QR Code
          </button>
        </>
      )}
    </div>
  );
};

export default Qr;
