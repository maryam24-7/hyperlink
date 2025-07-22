export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { resume_text, job_description } = req.body;
    
    if (!resume_text || !job_description) {
      return res.status(400).json({ error: 'Both resume text and job description are required' });
    }

    // استخراج الكلمات المفتاحية من وصف الوظيفة
    const extractKeywords = (text) => {
      const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
      const commonWords = new Set(['the', 'and', 'with', 'for', 'this', 'that', 'are', 'from', 'you', 'your']);
      
      const wordCount = {};
      words.forEach(word => {
        if (!commonWords.has(word) && word.length > 3) {
          wordCount[word] = (wordCount[word] || 0) + 1;
        }
      });
      
      return Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(entry => entry[0]);
    };

    const jobKeywords = extractKeywords(job_description);
    const resumeKeywords = extractKeywords(resume_text);
    
    const matchedKeywords = jobKeywords.filter(keyword => 
      resumeKeywords.includes(keyword)
    );
    
    const missingKeywords = jobKeywords.filter(keyword => 
      !resumeKeywords.includes(keyword)
    );
    
    const matchPercentage = Math.floor((matchedKeywords.length / jobKeywords.length) * 100);
    
    const suggestions = [];
    if (matchPercentage < 60) suggestions.push('Add more keywords from the job description');
    if (missingKeywords.length > 5) suggestions.push('Focus on the most important missing keywords');
    if (resume_text.length < 500) suggestions.push('Expand your resume with more details');
    if (resume_text.length > 1500) suggestions.push('Condense your resume to be more focused');
    
    return res.status(200).json({
      matchPercentage,
      resumeKeywordCount: resumeKeywords.length,
      jobKeywordCount: jobKeywords.length,
      matchedKeywords,
      missingKeywords,
      suggestions
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
      }
