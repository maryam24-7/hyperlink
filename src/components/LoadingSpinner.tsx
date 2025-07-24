import { useEffect, useState } from 'react';

export default function LoadingSpinner({ message = 'Loading' }) {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length < 3 ? d + '.' : '');
    }, 300);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ textAlign: "center", margin: "32px 0" }}>
      <div className="spinner" style={{ margin: "0 auto", width: 60, height: 60, border: "8px solid #eee", borderTop: "8px solid #4f46e5", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <style>{`@keyframes spin {100%{transform:rotate(360deg);}}`}</style>
      <p style={{ fontWeight: "bold" }}>{message}{dots}</p>
    </div>
  );
}
