import { useState, useRef } from 'react';
import { FiUpload, FiDownload, FiInfo } from 'react-icons/fi';
import { FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa';
import styles from '../styles/ATSAnalyzer.module.css';

const ATSAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const analyzeResume = () => {
    if (!file) return;
    
    setIsLoading(true);
    
    // Simulate analysis (in a real app, you would process the file here)
    setTimeout(() => {
      const mockAnalysis = {
        score: 78,
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
      
      setAnalysis(mockAnalysis);
      setIsLoading(false);
    }, 2000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={styles.atsContainer}>
      <div 
        className={styles.uploadArea}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className={styles.fileInput}
        />
        <FiUpload className={styles.uploadIcon} />
        <p>{file ? file.name : 'Drag & drop your resume here or click to browse'}</p>
        <p className={styles.supportedFormats}>Supported formats: PDF, DOC, DOCX</p>
      </div>
      
      <button 
        className={styles.analyzeButton}
        onClick={analyzeResume}
        disabled={!file || isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
      
      {analysis && (
        <div className={styles.resultsContainer}>
          <div className={styles.scoreSection}>
            <div className={styles.scoreCircle}>
              <span>{analysis.score}</span>
              <small>ATS Score</small>
            </div>
            <div className={styles.scoreFeedback}>
              {analysis.score >= 80 ? (
                <>
                  <FaCheckCircle className={styles.highScoreIcon} />
                  <p>Your resume is well optimized for ATS systems!</p>
                </>
              ) : analysis.score >= 60 ? (
                <>
                  <FaStar className={styles.mediumScoreIcon} />
                  <p>Your resume is decent but could be improved.</p>
                </>
              ) : (
                <>
                  <FaTimesCircle className={styles.lowScoreIcon} />
                  <p>Your resume needs significant improvements for ATS.</p>
                </>
              )}
            </div>
          </div>
          
          <div className={styles.resultsGrid}>
            <div className={styles.resultCard}>
              <h3>Strengths</h3>
              <ul>
                {analysis.strengths.map((item, index) => (
                  <li key={index}>
                    <FaCheckCircle className={styles.strengthIcon} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.resultCard}>
              <h3>Weaknesses</h3>
              <ul>
                {analysis.weaknesses.map((item, index) => (
                  <li key={index}>
                    <FaTimesCircle className={styles.weaknessIcon} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.resultCard}>
              <h3>Suggestions</h3>
              <ul>
                {analysis.suggestions.map((item, index) => (
                  <li key={index}>
                    <FiInfo className={styles.suggestionIcon} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.resultCard}>
              <h3>Keywords Found</h3>
              <div className={styles.keywordsContainer}>
                {analysis.keywords.map((keyword, index) => (
                  <span key={index} className={styles.keywordPill}>{keyword}</span>
                ))}
              </div>
            </div>
          </div>
          
          <button className={styles.downloadReportButton}>
            <FiDownload /> Download Full Report
          </button>
        </div>
      )}
    </div>
  );
};

export default ATSAnalyzer;
