import KeywordChart from './KeywordChart';
import ProgressBar from './ProgressBar';
import SectionAnalysis from './SectionAnalysis';

export default function AnalysisResult({ analysis }) {
  const { score, issues, suggestions, sections, keywords } = analysis;
  
  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Analysis Results</h2>
        
        <div className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <div className="flex items-center justify-center space-x-6">
            <div className="relative">
              <ProgressBar percentage={score} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className={`text-3xl font-bold ${getScoreColor()}`}>{score}%</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800">ATS Compatibility Score</h3>
              <p className="text-gray-600 max-w-md">
                {score >= 80 
                  ? 'Excellent! Your resume is well optimized for ATS systems.'
                  : score >= 60 
                    ? 'Good, but there is room for improvement.'
                    : 'Needs significant improvement to pass ATS screening.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Keyword Analysis</h3>
          <KeywordChart matched={keywords.matched} missing={keywords.missing} />
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">Missing Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {keywords.missing.map((keyword, index) => (
                <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Critical Issues</h3>
            <ul className="space-y-3">
              {issues.map((issue, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-700">{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Improvement Suggestions</h3>
            <ul className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Section Analysis</h3>
        <SectionAnalysis sections={sections} />
      </div>
    </div>
  );
    }
