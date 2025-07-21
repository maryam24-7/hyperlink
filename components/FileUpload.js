import { useCallback, useState } from 'react';

export default function FileUpload({ onAnalysisComplete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const fileType = file.name.split('.').pop().toLowerCase();
      const fileData = await readFileAsBase64(file);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileData, fileType })
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const results = await response.json();
      onAnalysisComplete(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [onAnalysisComplete]);

  return (
    <div className="file-upload">
      <input 
        type="file" 
        onChange={handleFileUpload}
        accept=".pdf,.docx,.txt"
        disabled={isLoading}
      />
      {isLoading && <p>Analyzing your resume...</p>}
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
}

async function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
