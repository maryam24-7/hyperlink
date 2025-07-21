import { PDFDocument } from 'pdf-lib';
import mammoth from 'mammoth';

export async function parsePDF(base64Data) {
  const pdfDoc = await PDFDocument.load(base64Data);
  let text = '';
  
  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i);
    text += await page.getTextContent();
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
