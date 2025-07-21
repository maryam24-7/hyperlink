import { useCallback } from 'react';

export default function FileUpload({ onAnalysisComplete }) {
  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.name.split('.').pop().toLowerCase();
    const fileData = await readFileAsBase64(file);

    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileData, fileType })
    });

    const results = await response.json();
    onAnalysisComplete(results);
  }, [onAnalysisComplete]);

  return (
    <div className="file-upload">
      <input 
        type="file" 
        onChange={handleFileUpload}
        accept=".pdf,.docx,.txt"
      />
      <button>Analyze Now</button>
    </div>
  );
}

async function readFileAsBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
}
