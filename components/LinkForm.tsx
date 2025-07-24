import { useState } from 'react';
import { toast } from 'react-hot-toast';
import QRGenerator from './QRGenerator';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function LinkForm() {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [qrCode, setQrCode] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url, 
          customAlias,
          expiresAt: expirationDate?.toISOString()
        })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Link created successfully!');
        navigator.clipboard.writeText(data.shortUrl);
        
        // Generate QR code
        const qrRes = await fetch('/api/qr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: data.shortUrl })
        });
        const qrData = await qrRes.json();
        setQrCode(qrData.qrUrl);
      } else {
        toast.error(data.error || 'An error occurred');
      }
    } catch (err) {
      toast.error('Failed to create link');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="link-form-container">
      <form onSubmit={handleSubmit} className="link-form">
        <div className="input-group">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="url-input"
          />
          <button type="submit" disabled={isGenerating} className="submit-button">
            {isGenerating ? 'Generating...' : 'Shorten'}
          </button>
        </div>

        <div className="basic-options">
          <input
            type="text"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            placeholder="Custom alias (optional)"
            className="alias-input"
          />
        </div>

        <button 
          type="button" 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="toggle-advanced"
        >
          {showAdvanced ? 'Hide Advanced' : 'Show Advanced Options'}
        </button>

        {showAdvanced && (
          <div className="advanced-options">
            <div className="expiration-option">
              <label>Link Expiration:</label>
              <DatePicker
                selected={expirationDate}
                onChange={(date) => setExpirationDate(date)}
                minDate={new Date()}
                placeholderText="No expiration"
                className="date-picker"
              />
            </div>
          </div>
        )}
      </form>

      {qrCode && (
        <div className="qr-result">
          <h3>Your QR Code:</h3>
          <QRGenerator url={qrCode} />
          <a 
            href={qrCode} 
            download="qrcode.png"
            className="download-button"
          >
            Download QR Code
          </a>
        </div>
      )}
    </div>
  );
}
