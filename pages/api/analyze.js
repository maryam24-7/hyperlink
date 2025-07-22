import { IncomingForm } from 'formidable';
import pdf from 'pdf-parse';
import docx2txt from 'docx2txt';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const form = new IncomingForm();
  
  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let text = '';
    const fileType = file.originalFilename.split('.').pop().toLowerCase();

    if (fileType === 'pdf') {
      const dataBuffer = await fs.readFile(file.filepath);
      const data = await pdf(dataBuffer);
      text = data.text;
    } else if (fileType === 'docx') {
      const dataBuffer = await fs.readFile(file.filepath);
      text = await docx2txt(dataBuffer);
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }

    // تحليل السيرة الذاتية
    const wordCount = text.split(/\s+/).length;
    const sections = ['Experience', 'Education', 'Skills', 'Summary', 'Projects'];
    const foundSections = sections.filter(section => 
      text.toLowerCase().includes(section.toLowerCase())
    );
    
    const commonKeywords = ['leadership', 'management', 'development', 'team', 'project', 
      'communication', 'problem solving', 'analytical', 'technical', 'results'];
    const matchedKeywords = commonKeywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
    
    const weaknesses = [];
    if (foundSections.length < 3) weaknesses.push('Missing essential sections');
    if (wordCount < 300) weaknesses.push('Resume is too short');
    if (wordCount > 800) weaknesses.push('Resume is too long');
    if (matchedKeywords.length < 5) weaknesses.push('Too few industry keywords');
    
    const strengths = [];
    if (foundSections.length >= 4) strengths.push('Well-structured sections');
    if (matchedKeywords.length >= 7) strengths.push('Strong keyword usage');
    if (text.includes('@') || text.includes('linkedin')) strengths.push('Contact info present');
    
    const score = Math.min(100, Math.floor(
      30 + 
      (foundSections.length / sections.length * 30) + 
      (matchedKeywords.length / commonKeywords.length * 40)
    ));
    
    return res.status(200).json({
      score,
      wordCount,
      fileType,
      strengths,
      weaknesses,
      keywordMatches: matchedKeywords,
      sectionMatches: foundSections
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
