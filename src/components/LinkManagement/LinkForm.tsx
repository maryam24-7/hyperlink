import { useState } from 'react';
import dynamic from 'next/dynamic';
const QRGenerator = dynamic(() => import('./QRGenerator'), { ssr: false });
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';

export default function LinkForm() {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // New state for direct QR link input
  const [qrInput, setQrInput] = useState('');
  const [qrInputValue, setQrInputValue] = useState('');

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

  // CSS styles
  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
  };

  const labelStyle: React.CSSProperties = {
    marginBottom: 6,
    fontWeight: 'bold',
  };

  const inputStyle: React.CSSProperties = {
    padding: 8,
    fontSize: 16,
    width: '100%',
  };

  // Handle QR input generation
  const handleQrInput = (e: React.FormEvent) => {
    e.preventDefault();
    setQrInputValue(qrInput);
  };

  return (
    <div>
      {/* URL Shortener Form */}
      <form onSubmit={handleSubmit} className="card" style={{ textAlign: "left" }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Destination URL</label>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
            style={inputStyle}
            placeholder="https://example.com"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Custom Alias <small style={{ fontWeight: 'normal', fontSize: '0.8em' }}>(Optional)</small>
          </label>
          <input
            type="text"
            value={customAlias}
            onChange={e => setCustomAlias(e.target.value)}
            style={inputStyle}
            placeholder="your-custom-alias"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            Expiration Date <small style={{ fontWeight: 'normal', fontSize: '0.8em' }}>(Optional)</small>
          </label>
          <DatePicker
            selected={expiresAt}
            onChange={date => setExpiresAt(date)}
            minDate={new Date()}
            placeholderText="Never expires"
            className="date-picker"
            wrapperClassName="date-picker-wrapper"
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{ width: "100%", padding: 12, fontSize: 18, cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          {isLoading ? "Creating..." : "Shorten URL"}
        </button>

        {qrCode && (
          <div style={{ marginTop: 24 }}>
            <b>Your QR:</b>
            <QRGenerator url={qrCode} />
          </div>
        )}
      </form>

      {/* Divider */}
      <div style={{ margin: "32px 0", borderTop: "1px solid #eee" }} />

      {/* QR Code Generator */}
      <form onSubmit={handleQrInput} className="card" style={{ textAlign: "left" }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Generate QR code from any URL</label>
          <input
            type="url"
            value={qrInput}
            onChange={e => setQrInput(e.target.value)}
            style={inputStyle}
            placeholder="Paste any link to generate QR"
            required
          />
        </div>
        <button
          type="submit"
          style={{ width: "100%", padding: 12, fontSize: 18 }}
        >
          Generate QR
        </button>
        {qrInputValue && (
          <div style={{ marginTop: 24 }}>
            <QRGenerator url={qrInputValue} />
            <div style={{ textAlign: "center", marginTop: 8, wordBreak: 'break-all', fontSize: 13, color: "#555" }}>
              {qrInputValue}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
