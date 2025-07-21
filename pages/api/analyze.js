import { analyzeResume } from '../../lib/ats-analyzer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileData, fileType, country } = req.body;
    const results = await analyzeResume({ fileData, fileType, country });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ 
      error: 'Analysis failed',
      details: error.message 
    });
  }
}
