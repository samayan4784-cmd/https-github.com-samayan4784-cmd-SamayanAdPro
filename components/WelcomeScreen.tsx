import React, { useState } from 'react';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [inputName, setInputName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) {
      setError('Please enter your name to continue.');
      return;
    }
    onStart(inputName.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-darker px-4">
      <div className="max-w-md w-full bg-brand-dark border border-brand-primary/20 rounded-2xl shadow-2xl overflow-hidden p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center shadow-lg shadow-brand-primary/40">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">Samayan Ad Pro</h1>
        <p className="text-gray-400 mb-8">Create professional ads with AI in seconds.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label htmlFor="name" className="block text-sm font-medium text-brand-accent mb-1">Your Name</label>
            <input
              type="text"
              id="name"
              className="w-full bg-brand-darker border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              placeholder="Ex: Ali Khan"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                setError('');
              }}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeScreen;