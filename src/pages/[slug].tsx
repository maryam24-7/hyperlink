import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import AdBanner from '../components/AdManager/AdBanner';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Redirect() {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const redirectUser = async () => {
      if (!slug) return;
      try {
        const docRef = doc(db, 'links', slug as string);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          setError('Link not found');
          setLoading(false);
          return;
        }
        const linkData = docSnap.data();
        // Check for expiration
        if (linkData.expiresAt && new Date(linkData.expiresAt) < new Date()) {
          setError('This link has expired');
          setLoading(false);
          return;
        }
        // Update analytics
        await updateDoc(docRef, {
          clicks: increment(1),
          lastAccessed: new Date().toISOString()
        });
        // Redirect after ad
        setTimeout(() => {
          window.location.href = linkData.originalUrl;
        }, 2000);
      } catch (err) {
        setError('Failed to redirect');
        setLoading(false);
      }
    };
    redirectUser();
  }, [slug]);

  if (loading) {
    return (
      <div className="redirect-container" style={{ textAlign: "center", margin: "80px 0" }}>
        <h1>Redirecting...</h1>
        <LoadingSpinner message="Preparing your link" />
        <AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER} format="auto" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="error-container" style={{ textAlign: "center", margin: "80px 0" }}>
        <h1>Error</h1>
        <p>{error}</p>
        <a href="/">Return Home</a>
      </div>
    );
  }
  return null;
}
