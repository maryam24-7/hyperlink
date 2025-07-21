export default function ResultsDisplay({ results }) {
  return (
    <div className="results-container">
      <h2>Analysis Results</h2>
      <div className="compatibility">
        <strong>ATS Compatibility:</strong> {results.compatibility}
      </div>
      
      <div className="keywords-section">
        <h3>Keywords Found:</h3>
        <ul>
          {results.keywords.map((keyword, index) => (
            <li key={index}>{keyword}</li>
          ))}
        </ul>
      </div>
      
      <div className="suggestions">
        <h3>Suggestions for Improvement:</h3>
        <ol>
          {results.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
