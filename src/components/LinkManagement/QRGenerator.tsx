import QRCode from 'qrcode.react';

export default function QRGenerator({ url, size = 200 }) {
  if (!url) return null;
  return (
    <div style={{ margin: "16px 0" }}>
      <QRCode value={url} size={size} fgColor="#4f46e5" bgColor="#fff" />
    </div>
  );
}
