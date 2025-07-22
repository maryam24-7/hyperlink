import { useCallback } from 'react';

export default function FileUploader({ onFileUpload, loading }) {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    if (loading) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload, loading]);

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-blue-500"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
          />
        </svg>
        
        <div className="text-center">
          <p className="font-medium text-gray-700">
            {loading ? 'Analyzing your resume...' : 'Drag & drop your resume here'}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {loading ? 'This may take a few seconds' : 'or click to browse files'}
          </p>
        </div>
        
        {!loading && (
          <>
            <label className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
              Select File
              <input 
                type="file" 
                className="hidden" 
                accept=".pdf,.doc,.docx" 
                onChange={handleChange}
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </>
        )}
      </div>
    </div>
  );
}
