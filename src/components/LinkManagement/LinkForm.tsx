// src/components/LinkManagement/LinkForm.tsx
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';

// lazy load QRGenerator
import dynamic from 'next/dynamic';
const QRGenerator = dynamic(() => import('./QRGenerator'), { ssr: false });

export default function LinkForm() {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shortLink, setShortLink] = useState('');

  // **أداة QR واحدة فقط**
  const [qrInput, setQrInput] = useState('');
  const [qrInputValue, setQrInputValue] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShortLink('');
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
        setShortLink(data.shortUrl || data.shortLink || data.shortURL || '');
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

  const handleQrInput = (e: React.FormEvent) => {
    e.preventDefault();
    setQrInputValue(qrInput);
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

        {shortLink && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <b>Short Link:</b>
            <div style={{
              marginTop: 8,
              padding: '10px 20px',
              borderRadius: 6,
              background: '#f5f5f5',
              display: 'inline-block',
              fontSize: 16,
              wordBreak: 'break-all'
            }}>
              <a href={shortLink} target="_blank" rel="noopener noreferrer">{shortLink}</a>
            </div>
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
          <div style={{ marginTop: 24, textAlign: "center" }}>
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
