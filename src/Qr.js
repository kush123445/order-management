// src/components/ScanQRCode.js
import React, { useRef ,  useState  } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import '../src/Qr.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineClose } from 'react-icons/ai';


const Qr = () => {
  const qrCodeRef = useRef(null);
  const [url, setUrl] = useState('');
  const [showQRCode, setShowQRCode] = useState(false); 
  const [isValidUrl, setIsValidUrl] = useState(true);

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      const qrCodeElement = qrCodeRef.current.firstChild;
      const qrCodeWidth = qrCodeElement.offsetWidth*3;
      const qrCodeHeight = qrCodeElement.offsetHeight*3;
  
      const canvas = document.createElement('canvas');
      canvas.width = qrCodeWidth +200 ;
      canvas.height = qrCodeHeight + 200; // Add extra space for the text
  
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
      const qrCodeX = (qrCodeWidth - qrCodeElement.offsetWidth) / 2;
    const qrCodeY = 0;

    // Draw the QR code image with increased size
    ctx.drawImage(qrCodeElement, qrCodeX-40, qrCodeY+50, qrCodeWidth, qrCodeHeight);
  
      // Add the text
      ctx.font = '24px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText('Please Scan this QR code to Open Menu & Enjoy', qrCodeWidth / 2 +100, qrCodeHeight + 85);
      ctx.fillText('Powered & Developed by CK developers', qrCodeWidth / 2 +80, qrCodeHeight + 110);
  
      // Convert the canvas to a data URL and download the image
      const qrCodeImage = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = qrCodeImage;
      link.download = 'qrcode_with_text.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value); // Update the URL state
  };

  const handleGenerateQR = () => {
    // You can add validation here if needed
    if(url==''){
        setIsValidUrl(false)
        return 
    }
    setIsValidUrl(true)
    setShowQRCode(true);// Update the URL state to trigger QR code generation
    const qrCodeValue = `https://example.com/tables/${url}`;
    setUrl(qrCodeValue)
    console.log(url)
  };

  const handleClearInput = () => {
    setUrl(''); // Clear the input field
    setShowQRCode(false); // Hide the QR code
  };
  const handleHideQRCode = () => {
    setUrl('')
    setIsValidUrl(true)
    setShowQRCode(false); // Hide the QR code when close icon is clicked
  };


  return (
    <div className="scan-container">
      <h2 className="heading">Generate QR Code</h2>
     <div className="input-container">
        <div>
  <input
    type="Number"
  
    value={url}
    onChange={handleUrlChange}
    placeholder="Enter URL"
    className={`url-input ${isValidUrl ? '' : 'error'}`}
  />
   {!isValidUrl && <p className="error-text">Please enter a valid URL</p>}
   </div>
  <button onClick={handleHideQRCode} className="close-btn"><AiOutlineClose /></button>
</div>
      <button onClick={handleGenerateQR} className="generate-btn">Generate QR Code</button>
      {showQRCode && (
        <>
          <div ref={qrCodeRef} className="qrcode-container">
            <QRCode value={url} />
          
          </div>
          <p className="instructions">Scan the QR code to open the URL</p>
          <button onClick={downloadQRCode} className="download-btn">Download QR Code</button>
        </>
      )}
    </div>
  );
};

export default Qr;
