import React from 'react';

interface ResultDisplayProps {
  result: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Generated Figma Content:</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        <code>{result}</code>
      </pre>
    </div>
  );
};

export default ResultDisplay;