import { useState } from 'react';
import Layout from '../components/Layout'; // تأكد من أن المسار صحيح
import FileUpload from '../components/FileUpload';
import ResultsDisplay from '../components/ResultsDisplay';

export default function Home() {
  const [results, setResults] = useState(null);

  return (
    <Layout>
      <h1>Resume ATS Checker</h1>
      <p>Upload your resume to check ATS compatibility</p>
      <FileUpload onAnalysisComplete={setResults} />
      {results && <ResultsDisplay results={results} />}
    </Layout>
  );
}
