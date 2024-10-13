// Import necessary dependencies
import QRCode from 'react-qr-code';

const QRCodeGenerator = (idForm: string) => {


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>QR Code</h2>
        <div style={{ marginTop: '20px' }}>
          <QRCode value={idForm} size={256} />
        </div>
    </div>
  );
};

export default QRCodeGenerator;
