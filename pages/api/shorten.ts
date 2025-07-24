import { NextApiRequest, NextApiResponse } from 'next';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { nanoid } from 'nanoid';
import { isWebUri } from 'valid-url';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, customAlias, expiresAt } = req.body;

  // Validate URL
  if (!isWebUri(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    let shortCode = customAlias || nanoid(6);
    
    // Check if custom alias exists
    if (customAlias) {
      const existingDoc = await getDoc(doc(db, 'links', customAlias));
      if (existingDoc.exists()) {
        return res.status(409).json({ error: 'Custom alias already in use' });
      }
    }

    // Create document in Firestore
    const docRef = doc(db, 'links', shortCode);
    await setDoc(docRef, {
      originalUrl: url,
      shortCode,
      createdAt: new Date().toISOString(),
      clicks: 0,
      expiresAt: expiresAt || null,
      createdBy: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    });

    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`;

    return res.status(200).json({
      originalUrl: url,
      shortUrl,
      shortCode,
      expiresAt
    });
  } catch (err) {
    console.error('Shortening error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
