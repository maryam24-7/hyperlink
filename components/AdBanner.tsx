import { useEffect } from 'react';
import Script from 'next/script';
import Head from 'next/head';

interface AdBannerProps {
  slot: string;
  format?: string;
  style?: React.CSSProperties;
  responsive?: boolean;
}

export default function AdBanner({ 
  slot, 
  format = 'auto', 
  style = {},
  responsive = true 
}: AdBannerProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('Ad push error:', err);
    }
  }, []);

  return (
    <>
      <Head>
        <script 
          async 
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          crossOrigin="anonymous"
        />
      </Head>
      
      <ins 
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style,
          ...(responsive ? { maxWidth: '100%' } : {})
        }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </>
  );
}
