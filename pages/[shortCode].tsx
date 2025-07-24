import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import AdBanner from '../components/AdBanner';
import Head from 'next/head';

export default function Redirect() {
  const router = useRouter();
  const { shortCode } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const redirect = async () => {
      if (!shortCode) return;
      
      try {
        const docRef = doc(db, 'links', shortCode as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const linkData = docSnap.data();
          
          // Check if link is expired
          if (linkData.expiresAt && new Date(linkData.expiresAt) < new Date()) {
            setError('This link has expired');
            setLoading(false);
            return;
          }

          // Update analytics
          await updateDoc(docRef, { 
            clicks: increment(1),
            lastAccessed: new Date().toISOString(),
            [`clicksByCountry.${getUserCountry()}`]: increment(1)
          });

          // Show ad for 3 seconds before redirect
          setTimeout(() => {
            window.location.href = linkData.originalUrl;
          }, 3000);
        } else {
          router.push('/404');
        }
      } catch (err) {
        console.error('Redirect error:', err);
        setError('Failed to redirect');
        setLoading(false);
      }
    };

    redirect();
  }, [shortCode]);

  const getUserCountry = () => {
    // In a real app, use a geoIP service or client-side detection
    return 'US'; // Default to US for demo
  };

  return (
    <div className="redirect-container">
      <Head>
        <title>Redirecting - ShortXpress</title>
        <meta name="description" content="You are being redirected to your destination" />
      </Head>
      
      {loading ? (
        <div className="loading-content">
          <h1>Redirecting you...</h1>
          <div className="spinner"></div>
          <p>Please wait while we take you to your destination</p>
          
          {/* Premium Ad Space */}
          <AdBanner 
            slot="728x90"
            style={{ margin: '20px 0' }}
          />
          
          <div className="premium-offer">
            <h3>Want to skip the wait?</h3>
            <a href="/pricing" className="premium-button">Go Premium</a>
          </div>
        </div>
      ) : error ? (
        <div className="error-message">
          <h2>{error}</h2>
          <a href="/" className="home-link">Return to homepage</a>
        </div>
      ) : null}
    </div>
  );
}
