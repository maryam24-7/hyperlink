// pages/index.js
import { useState, useRef } from 'react';
import Head from 'next/head';

export default function ResumeATSCheckerPro() {
  const [activeTab, setActiveTab] = useState('ats');
  const [atsResult, setAtsResult] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  // تحليل السيرة الذاتية
  const analyzeResume = async (file) => {
    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Analysis failed');
      
      const result = await response.json();
      setAtsResult(result);
    } catch (err) {
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  // مقارنة السيرة مع وصف الوظيفة
  const compareResumeWithJob = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError('Both resume text and job description are required');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          resume_text: resumeText, 
          job_description: jobDescription 
        })
      });

      if (!response.ok) throw new Error('Comparison failed');
      
      const result = await response.json();
      setComparisonResult(result);
    } catch (err) {
      setError(err.message || 'An error occurred during comparison');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      analyzeResume(file);
    }
  };

  // تصميم زر احترافي
  const ProfessionalButton = ({ children, onClick, color = 'blue', disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-lg
        ${disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : color === 'blue' 
            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 focus:ring-blue-400 shadow-blue-500/30' 
            : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-400 focus:ring-gray-300 shadow-gray-500/20'
        }
      `}
    >
      <div className="flex items-center justify-center">
        {children}
      </div>
    </button>
  );

  // تصميم بطاقة النتائج
  const ResultCard = ({ title, icon, color, children }) => (
    <div className={`bg-white p-5 rounded-xl shadow-lg border-l-4 border-${color}-500 transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-center mb-3">
        <div className={`bg-${color}-100 p-2 rounded-lg mr-3`}>
          {icon}
        </div>
        <h3 className={`font-bold text-${color}-800`}>{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );

  // تصميم شريط التقدم
  const ProgressBar = ({ percentage }) => {
    const getColor = (percent) => {
      if (percent >= 80) return 'bg-gradient-to-r from-green-500 to-emerald-500';
      if (percent >= 60) return 'bg-gradient-to-r from-yellow-500 to-amber-500';
      return 'bg-gradient-to-r from-red-500 to-orange-500';
    };
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-4 mb-1 overflow-hidden">
        <div 
          className={`h-full rounded-full ${getColor(percentage)} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <Head>
        <title>Resume ATS Checker Pro</title>
        <meta name="description" content="Optimize your resume for Applicant Tracking Systems" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="resume, ATS, job application, resume checker, CV analysis" />
        <meta property="og:title" content="Resume ATS Checker Pro" />
        <meta property="og:description" content="Get your resume optimized for Applicant Tracking Systems" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-white"></div>
            <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-indigo-500"></div>
            <div className="absolute bottom-10 left-1/3 w-24 h-24 rounded-full bg-blue-500"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Resume ATS Checker Pro</h1>
            <p className="text-lg opacity-90">Optimize your resume for Applicant Tracking Systems and job descriptions</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-5 px-6 font-medium transition-all ${activeTab === 'ats' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('ats')}
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              ATS Resume Analysis
            </div>
          </button>
          <button
            className={`flex-1 py-5 px-6 font-medium transition-all ${activeTab === 'comparison' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('comparison')}
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              CV vs Job Description
            </div>
          </button>
        </div>

        <div className="p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center animate-pulse">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              {error}
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center my-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
              <p className="text-lg text-gray-600 font-medium">Analyzing your resume...</p>
              <p className="text-gray-500">This may take a few seconds</p>
            </div>
          )}

          {/* ATS Analysis Tab */}
          {activeTab === 'ats' && !loading && (
            <div>
              {!atsResult ? (
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Your Resume</h2>
                  <p className="mb-8 text-gray-600 max-w-2xl mx-auto">
                    Get instant feedback on your resume's compatibility with Applicant Tracking Systems.
                    We'll analyze format, keywords, structure, and more to help you get more interviews.
                  </p>
                  
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-xl p-10 cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-100 transition-all duration-300"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-full mb-5">
                        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                      </div>
                      <p className="text-gray-800 font-bold text-lg">Click to upload resume</p>
                      <p className="text-gray-500 mt-2">Supports PDF and DOCX files</p>
                      
                      <ProfessionalButton 
                        color="gray"
                        onClick={() => fileInputRef.current.click()}
                        className="mt-6"
                      >
                        Choose File
                      </ProfessionalButton>
                    </div>
                  </div>
                  
                  <div className="mt-10 text-left bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-xl text-blue-800 mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      What We Analyze
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">File Format</h4>
                          <p className="text-gray-600 text-sm">Check for ATS-friendly formats</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Keywords</h4>
                          <p className="text-gray-600 text-sm">Identify essential industry keywords</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Contact Info</h4>
                          <p className="text-gray-600 text-sm">Verify presence of contact details</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Sections</h4>
                          <p className="text-gray-600 text-sm">Confirm essential resume sections</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Resume Analysis Result</h2>
                    
                    <div className="max-w-md mx-auto mb-8">
                      <div className="relative flex justify-center mb-5">
                        <div className="absolute top-0">
                          <div className="relative">
                            <div 
                              className="w-40 h-40 rounded-full flex items-center justify-center" 
                              style={{
                                background: `conic-gradient(
                                  #10B981 0% ${atsResult.score}%, 
                                  #EF4444 ${atsResult.score}% 100%
                                )`
                              }}
                            >
                              <div className="absolute inset-5 bg-white rounded-full flex flex-col items-center justify-center shadow-md">
                                <span className="text-3xl font-bold text-gray-800">{atsResult.score}%</span>
                                <span className="text-sm text-gray-500 mt-1">ATS Score</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-44">
                        <div className="mb-3 flex justify-between text-sm text-gray-600">
                          <span>Poor</span>
                          <span>Excellent</span>
                        </div>
                        <ProgressBar percentage={atsResult.score} />
                      </div>
                      
                      <p className="mt-6 text-gray-700 text-lg">
                        {atsResult.score >= 80 
                          ? "Excellent! Your resume is well optimized for ATS systems." 
                          : atsResult.score >= 60 
                            ? "Good, but there are areas for improvement." 
                            : "Needs significant improvement to pass ATS screening."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResultCard 
                      title="Strengths" 
                      icon={
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      }
                      color="green"
                    >
                      <ul className="space-y-3">
                        {atsResult.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </ResultCard>

                    <ResultCard 
                      title="Areas for Improvement" 
                      icon={
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                      }
                      color="red"
                    >
                      <ul className="space-y-3">
                        {atsResult.weaknesses.map((weakness, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            <span className="text-gray-700">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </ResultCard>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                    <h3 className="font-bold text-lg text-purple-800 mb-4">Analysis Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-500 mb-1">Format</div>
                        <div className="font-semibold text-gray-800">{atsResult.fileType.toUpperCase()}</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-500 mb-1">Word Count</div>
                        <div className="font-semibold text-gray-800">{atsResult.wordCount}</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-500 mb-1">Keywords Found</div>
                        <div className="font-semibold text-gray-800">{atsResult.keywordMatches.length}</div>
                      </div>
                    </div>
                  </div>

                  {atsResult.keywordMatches.length > 0 && (
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
                      <h3 className="font-bold text-lg text-indigo-800 mb-4">Keyword Matches</h3>
                      <div className="flex flex-wrap gap-2">
                        {atsResult.keywordMatches.map((keyword, i) => (
                          <span 
                            key={i} 
                            className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium shadow-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <ProfessionalButton 
                      onClick={() => setAtsResult(null)}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      Analyze Another Resume
                    </ProfessionalButton>
                    
                    <ProfessionalButton 
                      color="gray"
                      onClick={() => {
                        setAtsResult(null);
                        setActiveTab('comparison');
                      }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                      </svg>
                      Compare with Job Description
                    </ProfessionalButton>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CV vs Job Description Tab */}
          {activeTab === 'comparison' && !loading && (
            <div>
              {!comparisonResult ? (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-800 text-center">Compare Resume with Job Description</h2>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                    <div className="mb-6">
                      <label className="block text-gray-700 font-bold mb-3">Resume Text</label>
                      <textarea
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your resume text here..."
                        className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-bold mb-3">Job Description</label>
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the job description here..."
                        className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      ></textarea>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <ProfessionalButton
                        onClick={compareResumeWithJob}
                        disabled={!resumeText.trim() || !jobDescription.trim()}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        Analyze Compatibility
                      </ProfessionalButton>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-lg text-blue-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                      </svg>
                      Tips for Best Results
                    </h3>
                    <ul className="list-disc pl-5 space-y-3 text-gray-700">
                      <li>Copy/paste directly from your resume document for accurate analysis</li>
                      <li>Include the full job description text, including requirements and responsibilities</li>
                      <li>Remove personal contact information if concerned about privacy</li>
                      <li>We'll identify matching keywords and provide actionable improvement suggestions</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Compatibility Analysis</h2>
                    
                    <div className="max-w-md mx-auto mb-8">
                      <div className="relative flex justify-center mb-5">
                        <div className="absolute top-0">
                          <div className="relative">
                            <div 
                              className="w-40 h-40 rounded-full flex items-center justify-center" 
                              style={{
                                background: `conic-gradient(
                                  #10B981 0% ${comparisonResult.matchPercentage}%, 
                                  #EF4444 ${comparisonResult.matchPercentage}% 100%
                                )`
                              }}
                            >
                              <div className="absolute inset-5 bg-white rounded-full flex flex-col items-center justify-center shadow-md">
                                <span className="text-3xl font-bold text-gray-800">{comparisonResult.matchPercentage}%</span>
                                <span className="text-sm text-gray-500 mt-1">Match Score</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-44">
                        <div className="mb-3 flex justify-between text-sm text-gray-600">
                          <span>Poor Match</span>
                          <span>Excellent Match</span>
                        </div>
                        <ProgressBar percentage={comparisonResult.matchPercentage} />
                      </div>
                      
                      <p className="mt-6 text-gray-700 text-lg">
                        {comparisonResult.matchPercentage >= 80 
                          ? "Excellent match! Your resume aligns well with the job requirements." 
                          : comparisonResult.matchPercentage >= 60 
                            ? "Good match, but there's room for improvement." 
                            : "Low match. Consider optimizing your resume for this position."}
                      </p>
                      <p className="mt-2 text-gray-600">
                        {comparisonResult.resumeKeywordCount} of {comparisonResult.jobKeywordCount} job keywords matched
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResultCard 
                      title="Matched Keywords" 
                      icon={
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      }
                      color="green"
                    >
                      <div className="flex flex-wrap gap-2">
                        {comparisonResult.matchedKeywords.length > 0 ? (
                          comparisonResult.matchedKeywords.slice(0, 15).map((keyword, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                            >
                              {keyword}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-600 py-2">No significant matches found</p>
                        )}
                      </div>
                    </ResultCard>

                    <ResultCard 
                      title="Missing Keywords" 
                      icon={
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      }
                      color="red"
                    >
                      <div className="flex flex-wrap gap-2">
                        {comparisonResult.missingKeywords.length > 0 ? (
                          comparisonResult.missingKeywords.slice(0, 15).map((keyword, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1.5 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                            >
                              {keyword}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-600 py-2">All important keywords matched!</p>
                        )}
                      </div>
                    </ResultCard>
                  </div>

                  <ResultCard 
                    title="Optimization Suggestions" 
                    icon={
                      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                    }
                    color="yellow"
                  >
                    <ul className="space-y-4">
                      {comparisonResult.suggestions.map((suggestion, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-5 h-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                          </svg>
                          <span className="text-gray-700">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </ResultCard>

                  <div className="flex flex-col md:flex-row gap-4 pt-2">
                    <ProfessionalButton 
                      onClick={() => setComparisonResult(null)}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      New Comparison
                    </ProfessionalButton>
                    
                    <ProfessionalButton 
                      color="gray"
                      onClick={() => {
                        setComparisonResult(null);
                        setActiveTab('ats');
                      }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                      Analyze Resume
                    </ProfessionalButton>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-600">
        <p className="font-medium">Resume ATS Checker Pro • Optimize your job application success</p>
        <p className="mt-2 text-sm">© {new Date().getFullYear()} All rights reserved</p>
      </footer>
    </div>
  );
}
