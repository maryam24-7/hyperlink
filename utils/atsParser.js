export const analyzeResume = async (file) => {
  // This is a mock function - in a real app, you would parse the PDF/DOC file here
  // and implement actual ATS analysis logic
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockAnalysis = {
        score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        strengths: [
          'Clear contact information',
          'Good use of action verbs',
          'Appropriate length (2 pages)'
        ],
        weaknesses: [
          'Missing relevant keywords',
          'No quantifiable achievements',
          'Unprofessional email address'
        ],
        suggestions: [
          'Add more industry-specific keywords',
          'Quantify your achievements with numbers',
          'Use a professional email format'
        ],
        keywords: ['JavaScript', 'React', 'Node.js', 'Team Leadership', 'Project Management']
      };
      resolve(mockAnalysis);
    }, 1500);
  });
};
