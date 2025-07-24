import { useState } from 'react';
import QRGenerator from './QRGenerator';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';

export default function LinkForm() {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/links/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalUrl: url,
          customAlias,
          expiresAt: expiresAt?.toISOString()
        })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Link created!');
        setQrCode(data.qrCodeUrl);
        setUrl('');
        setCustomAlias('');
        setExpiresAt(null);
      } else {
        toast.error(data.error || 'Failed to create link');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ textAlign: "left" }}>
      <div className="form-group">
        <label>Destination URL</label>
        <input type="url" value={url} onChange={e => setUrl(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Custom Alias <small>(اختياري)</small></label>
        <input type="text" value={customAlias} onChange={e => setCustomAlias(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Expiration Date <small>(اختياري)</small></label>
        <DatePicker selected={expiresAt} onChange={date => setExpiresAt(date)} minDate={new Date()} placeholderText="Never expires" className="date-picker" />
      </div>
      <button type="submit" disabled={isLoading} style={{ width: "100%" }}>
        {isLoading ? "Creating..." : "Shorten URL"}
      </button>
      {qrCode && (
        <div style={{ marginTop: 24 }}>
          <b>Your QR:</b>
          <QRGenerator url={qrCode} />
        </div>
      )}
    </form>
  );
}
