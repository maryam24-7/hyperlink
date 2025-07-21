import { parsePDF, parseDOCX, parseTXT } from './file-parser';

export async function analyzeResume({ fileData, fileType, country = 'US' }) {
  let content;
  
  switch(fileType) {
    case 'pdf':
      content = await parsePDF(fileData);
      break;
    case 'docx':
      content = await parseDOCX(fileData);
      break;
    case 'txt':
      content = await parseTXT(fileData);
      break;
    default:
      throw new Error('Unsupported file type');
  }

  const analysisRules = getCountryRules(country);
  const score = calculateScore(content, analysisRules);
  
  return {
    score,
    suggestions: generateSuggestions(content, analysisRules),
    keywords: extractKeywords(content),
    compatibility: `${score}%`
  };
}

function getCountryRules(country) {
  const rules = {
    US: { keywords: ['skills', 'experience'], minLength: 500 },
    CA: { keywords: ['education', 'certifications'], minLength: 600 },
    UK: { keywords: ['professional summary'], minLength: 400 },
    AU: { keywords: ['key competencies'], minLength: 450 }
  };
  return rules[country] || rules.US;
}
