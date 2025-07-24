import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRGeneratorProps {
  url: string;
  size?: number;
}

export default function QRGenerator({ url, size = 200 }: QRGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      }, (error) => {
        if (error) console.error('QR generation error:', error);
      });
    }
  }, [url, size]);

  return <canvas ref={canvasRef} />;
}
