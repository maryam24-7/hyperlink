import { NextApiRequest, NextApiResponse } from 'next';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, storage } from '../../../lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { originalUrl, customAlias, expiresAt } = req.body;

    // تحقق من صحة الرابط
    if (!originalUrl || !originalUrl.match(/^https?:\/\/.+/)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // إنشاء كود مختصر (alias) عشوائي إذا لم يكن مخصصًا
    const shortCode = customAlias ? customAlias.trim() : uuidv4().substring(0, 8);

    // تحقق من عدم وجود alias مكرر في قاعدة البيانات
    if (customAlias) {
      const existingDoc = await getDoc(doc(db, 'links', shortCode));
      if (existingDoc.exists()) {
        return res.status(409).json({ error: 'Custom alias already in use' });
      }
    }

    // توليد QR code على شكل Data URL
    const qrDataUrl = await QRCode.toDataURL(`${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`);

    // رفع صورة QR إلى Firebase Storage
    const qrRef = ref(storage, `qrcodes/${shortCode}.png`);
    await uploadString(qrRef, qrDataUrl.split(',')[1], 'base64', { contentType: 'image/png' });
    const qrCodeUrl = await getDownloadURL(qrRef);

    // حفظ بيانات الرابط المختصر في Firestore
    const docRef = doc(db, 'links', shortCode);
    await setDoc(docRef, {
      originalUrl,
      shortCode,
      qrCodeUrl,
      expiresAt: expiresAt || null,
      createdAt: new Date().toISOString(),
      clicks: 0
    });

    // الرد بالبيانات الناجحة
    return res.status(200).json({
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`,
      qrCodeUrl,
      shortCode,
      expiresAt
    });

  } catch (error: any) {
    console.error('Error creating short link:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
