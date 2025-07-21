import { parsePDF, parseDOCX, parseTXT } from './file-parser';

function calculateScore(content, rules) {
  let score = 0;
  
  // حساب النقاط بناء على الكلمات المفتاحية
  const keywordsFound = rules.keywords.filter(kw => 
    content.toLowerCase().includes(kw.toLowerCase())
  );
  score += (keywordsFound.length / rules.keywords.length) * 50;
  
  // حساب النقاط بناء على طول المحتوى
  const lengthScore = Math.min(content.length / rules.minLength, 1) * 50;
  score += lengthScore;
  
  return Math.round(score);
}

function generateSuggestions(content, rules) {
  const suggestions = [];
  
  // اقتراحات للكلمات المفتاحية المفقودة
  rules.keywords.forEach(keyword => {
    if (!content.toLowerCase().includes(keyword.toLowerCase())) {
      suggestions.push(`Add "${keyword}" section to your resume`);
    }
  });
  
  // اقتراحات لطول السيرة الذاتية
  if (content.length < rules.minLength) {
    suggestions.push(`Expand your resume content to at least ${rules.minLength} characters`);
  }
  
  return suggestions;
}

function extractKeywords(content) {
  // قائمة بالكلمات المهمة (يمكن توسيعها)
  const importantKeywords = [
    'experience', 'education', 'skills', 'projects',
    'certifications', 'achievements', 'summary'
  ];
  
  return importantKeywords.filter(keyword => 
    content.toLowerCase().includes(keyword.toLowerCase())
  );
}

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
    compatibility: `${score}%`,
    contentLength: content.length
  };
}

function getCountryRules(country) {
  const rules = {
    US: { keywords: ['skills', 'experience', 'education'], minLength: 500 },
    CA: { keywords: ['education', 'certifications', 'projects'], minLength: 600 },
    UK: { keywords: ['professional summary', 'achievements'], minLength: 400 },
    AU: { keywords: ['key competencies', 'technical skills'], minLength: 450 }
  };
  return rules[country] || rules.US;
}
