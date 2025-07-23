import { useState, useRef } from 'react';
import { FiUpload, FiDownload, FiInfo } from 'react-icons/fi';
import { FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa';
import { analyzeResume } from '../utils/atsParser';
import styles from '../styles/ATSAnalyzer.module.css';

const ATSAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnalysis(null); // Reset previous analysis when new file is selected
  };

  const analyzeResumeHandler = async () => {
    if (!file) return;
    
    setIsLoading(true);
    setAnalysis(null);
    
    try {
      const analysisResult = await analyzeResume(file);
      setAnalysis(analysisResult);
    } catch (error) {
      console.error('Analysis error:', error);
      // You can add error state handling here
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the component remains the same ...
};

export default ATSAnalyzer;
