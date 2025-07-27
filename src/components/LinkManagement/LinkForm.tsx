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

  // نمط مشترك للحقل الواحد: عمودي في الجوال، أفقي في الحاسوب
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

  // خاص بالحواسيب - يتم تفعيله عبر media query في CSS أو باستخدام window.innerWidth
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

  if (isDesktop) {
    fieldStyle.flexDirection = 'row';
    fieldStyle.alignItems = 'center';
    labelStyle.width = 160;
    labelStyle.marginBottom = 0;
    inputStyle.flexGrow = 1;
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ textAlign: "left" }}>
      <div style={fieldStyle}>
        <label style={labelStyle}>Destination URL</label>
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
          style={inputStyle}
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
  );
}
