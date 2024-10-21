import React, { useState } from 'react';
import { FileType } from 'lucide-react';

interface PromptInputProps {
  onPromptSubmit: (prompt: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ onPromptSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onPromptSubmit(prompt.trim());
      setPrompt('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center border rounded-lg overflow-hidden">
        <FileType className="ml-2 text-gray-400" size={20} />
        <input
          type="text"
          id="promptInput"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="flex-grow p-2 outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PromptInput;