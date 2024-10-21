import React, { useState } from 'react';
import { Upload, FileType, Image, Palette } from 'lucide-react';
import FileUpload from './components/FileUpload';
import PromptInput from './components/PromptInput';
import ResultDisplay from './components/ResultDisplay';
import { generateFigmaContent } from './services/figmaService';

function App() {
  const [input, setInput] = useState<File | string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (value: File | string) => {
    setInput(value);
    setResult(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!input) return;

    setLoading(true);
    setError(null);
    try {
      const generatedContent = await generateFigmaContent(input);
      setResult(generatedContent);
    } catch (error) {
      console.error('Error generating Figma content:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Figma Content Generator</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <Upload className="mr-2" size={20} />
            Upload Image
          </button>
          <button
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            onClick={() => document.getElementById('promptInput')?.focus()}
          >
            <FileType className="mr-2" size={20} />
            Enter Prompt
          </button>
        </div>
        <FileUpload onFileSelect={handleInputChange} />
        <PromptInput onPromptSubmit={handleInputChange} />
        <button
          className="w-full mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition flex items-center justify-center"
          onClick={handleGenerate}
          disabled={!input || loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <Palette className="mr-2" size={20} />
              Generate Figma Content
            </>
          )}
        </button>
      </div>
      <ResultDisplay result={result} />
    </div>
  );
}

export default App;