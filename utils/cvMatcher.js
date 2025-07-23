export const matchCVWithJob = async (resumeFile, jobDescription) => {
  // This is a mock function - in a real app, you would parse the resume
  // and implement actual matching logic with the job description
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Extract keywords from job description (mock implementation)
      const jobKeywords = extractKeywords(jobDescription);
      
      const mockResult = {
        matchPercentage: Math.floor(Math.random() * 30) + 60, // Random match between 60-90%
        matchedKeywords: jobKeywords.map(keyword => ({
          keyword,
          matched: Math.random() > 0.3 // 70% chance of being matched
        })),
        missingKeywords: jobKeywords.filter(() => Math.random() > 0.7), // 30% chance of being missing
        suggestions: [
          'Add more details about your experience with Project Management',
          'Include any AWS certifications or projects',
          'Mention your familiarity with Docker if applicable'
        ]
      };
      
      resolve(mockResult);
    }, 2000);
  });
};

// Mock function to extract keywords from job description
const extractKeywords = (text) => {
  const commonKeywords = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java',
    'AWS', 'Docker', 'Kubernetes', 'Agile', 'Scrum',
    'Team Leadership', 'Project Management', 'UI/UX',
    'Database', 'SQL', 'NoSQL', 'Git', 'CI/CD'
  ];
  
  // Return a random selection of 8-12 keywords
  const count = Math.floor(Math.random() * 5) + 8;
  const shuffled = [...commonKeywords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
