// Import necessary dependencies
import QRCode from 'react-qr-code';

const QRCodeGenerator = (idForm: string) => {


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <div >
          <QRCode value={idForm} size={256} />
        </div>
    </div>
  );
};

export default QRCodeGenerator;
