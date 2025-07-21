import { analyzeResume } from '../../lib/ats-analyzer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['POST']
    });
  }

  try {
    const { fileData, fileType, country = 'US' } = req.body;
    
    if (!fileData || !fileType) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        requiredFields: ['fileData', 'fileType']
      });
    }

    const results = await analyzeResume({ fileData, fileType, country });
    return res.status(200).json(results);
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
