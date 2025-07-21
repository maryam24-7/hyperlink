import { getDocument } from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import mammoth from 'mammoth';

// تهيئة pdfjs worker
getDocument.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function parsePDF(base64Data) {
  const pdf = await getDocument({ data: atob(base64Data) }).promise;
  let text = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(' ');
  }
  
  return text;
}

export async function parseDOCX(base64Data) {
  const buffer = Buffer.from(base64Data, 'base64');
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

export function parseTXT(base64Data) {
  return Buffer.from(base64Data, 'base64').toString('utf-8');
}
