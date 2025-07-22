import { IncomingForm } from 'formidable';
import pdf from 'pdf-parse';
import docx2txt from 'docx2txt';
import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

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
      const dataBuffer = await readFileAsync(file.filepath);
      const data = await pdf(dataBuffer);
      text = data.text;
    } else if (fileType === 'docx') {
      const dataBuffer = await readFileAsync(file.filepath);
      text = await docx2txt(dataBuffer);
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }

    const analysisResult = performAtsAnalysis(text, fileType);
    return res.status(200).json(analysisResult);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function performAtsAnalysis(text, fileType) {
  // نفس كود التحليل من الإصدار السابق
}
