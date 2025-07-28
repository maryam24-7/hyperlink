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

  // --- جديد: حالة لإدخال رابط خارجي لتوليد QR فقط ---
  const [externalUrl, setExternalUrl] = useState('');
  const [externalQrCode, setExternalQrCode] = useState('');

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

  // --- جديد: توليد QR مباشر للرابط الخارجي بدون تقصير ---
  const handleGenerateExternalQr = () => {
    if (!externalUrl) {
      toast.error('Please enter a URL to generate QR code.');
      return;
    }
    setExternalQrCode(externalUrl);
  };

  // أنماط الحقول كما كانت
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

  // Responsive layout (كما في الكود الأصلي)
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
  if (isDesktop) {
    fieldStyle.flexDirection = 'row';
    fieldStyle.alignItems = 'center';
    labelStyle.width = 160;
    labelStyle.marginBottom = 0;
    inputStyle.flexGrow = 1;
  }

  return (
    <>
      {/* فورم تقصير الرابط */}
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

      {/* --- جديد: أداة توليد QR مباشر للرابط الخارجي --- */}
      <div className="card" style={{ marginTop: 48, textAlign: "left" }}>
        <h3>Generate QR Code for any URL</h3>
        <div style={fieldStyle}>
          <label style={labelStyle}>Enter URL</label>
          <input
            type="url"
            value={externalUrl}
            onChange={e => setExternalUrl(e.target.value)}
            placeholder="https://example.com"
            style={inputStyle}
          />
        </div>
        <button
          type="button"
          onClick={handleGenerateExternalQr}
          style={{ width: "100%", padding: 12, fontSize: 18, cursor: 'pointer' }}
        >
          Generate QR Code
        </button>

        {externalQrCode && (
          <div style={{ marginTop: 24 }}>
            <b>QR Code:</b>
            <QRGenerator url={externalQrCode} />
          </div>
        )}
      </div>
    </>
  );
}
