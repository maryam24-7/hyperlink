import { NextApiRequest, NextApiResponse } from 'next';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 500,
      margin: 2
    });

    // Upload to Firebase Storage
    const fileName = `qrcodes/${uuidv4()}.png`;
    const storageRef = ref(storage, fileName);
    await uploadString(storageRef, qrDataUrl.split(',')[1], 'base64', {
      contentType: 'image/png'
    });

    // Get public URL
    const qrUrl = await getDownloadURL(storageRef);

    return res.status(200).json({ qrUrl });
  } catch (err) {
    console.error('QR generation error:', err);
    return res.status(500).json({ error: 'Failed to generate QR code' });
  }
}
