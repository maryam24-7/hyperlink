import { useState, useRef } from 'react';
import { FiUpload, FiFileText, FiPercent } from 'react-icons/fi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { matchCVWithJob } from '../utils/cvMatcher';
import styles from '../styles/CVJobMatcher.module.css';

const CVJobMatcher = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [matchResult, setMatchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const resumeInputRef = useRef(null);

  // ... other handlers remain the same ...

  const calculateMatch = async () => {
    if (!resumeFile || !jobDescription.trim()) return;
    
    setIsLoading(true);
    setMatchResult(null);
    
    try {
      const matchResult = await matchCVWithJob(resumeFile, jobDescription);
      setMatchResult(matchResult);
    } catch (error) {
      console.error('Matching error:', error);
      // You can add error state handling here
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the component remains the same ...
};

export default CVJobMatcher;
