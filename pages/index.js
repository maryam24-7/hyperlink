import { useState } from 'react';
import FileUploader from '../components/FileUploader';
import AnalysisResult from '../components/AnalysisResult';
import Head from 'next/head';

export default function Home() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze file');
      }
      
      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      setError(err.message || 'An error occurred during analysis');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>Resume ATS Analyzer</title>
        <meta name="description" content="Professional resume analyzer for ATS compatibility" />
      </Head>

      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Resume ATS Analyzer</h1>
          <p className="text-gray-600">
            Upload your resume to check its compatibility with Applicant Tracking Systems
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <FileUploader onFileUpload={handleFileUpload} loading={loading} />
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">
              <p className="font-medium">Error: {error}</p>
              <p className="text-sm mt-1">Please try another file or contact support</p>
            </div>
          )}
        </div>

        {analysis && !loading && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <AnalysisResult analysis={analysis} />
          </div>
        )}
      </div>
    </div>
  );
}
