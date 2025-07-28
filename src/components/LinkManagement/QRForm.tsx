import { useState } from 'react';
import QRGenerator from './QRGenerator';

export default function QRForm() {
  const [qrInput, setQrInput] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleGenerateQR = (e: React.FormEvent) => {
    e.preventDefault();
    setShowQR(Boolean(qrInput));
  };

  return (
    <form onSubmit={handleGenerateQR} className="card" style={{ textAlign: "left", marginTop: 32 }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 16,
      }}>
        <label style={{ marginBottom: 6, fontWeight: 'bold' }}>URL to QR Code</label>
        <input
          type="url"
          value={qrInput}
          onChange={e => setQrInput(e.target.value)}
          placeholder="Enter any URL to generate QR"
          required
          style={{ padding: 8, fontSize: 16, width: '100%' }}
        />
      </div>
      <button
        type="submit"
        style={{ width: "100%", padding: 12, fontSize: 18, marginBottom: 12 }}
      >
        Generate QR
      </button>
      {showQR && <QRGenerator url={qrInput} />}
    </form>
  );
}
