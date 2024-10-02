// Import necessary dependencies
import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const QRCodeGenerator = () => {
  const [value, setValue] = useState('');

  // Handle input change for dynamic QR code generation
  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>QR Code Generator</h2>
      
      <input
        type="text"
        placeholder="Enter text or URL"
        value={value}
        onChange={handleInputChange}
        style={{ padding: '10px', width: '300px' }}
      />
      
      {value && (
        <div style={{ marginTop: '20px' }}>
          <QRCode value={value} size={256} />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
