import React, { useState } from 'react';
import { UserState, AppStatus, AdResult, AspectRatio } from '../types';
import { generateAdImage, generateAdCopy } from '../services/geminiService';
import AdResultCard from './AdResultCard';

interface MainAppProps {
  user: UserState;
}

const MainApp: React.FC<MainAppProps> = ({ user }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState<AdResult | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setStatus(AppStatus.GENERATING_IMAGE);
    setErrorMsg('');
    setResult(null);

    try {
      // 1. Generate Image with selected Aspect Ratio
      const imageUrl = await generateAdImage(prompt, aspectRatio);
      
      setStatus(AppStatus.GENERATING_COPY);
      
      // 2. Generate Copy
      const copy = await generateAdCopy(prompt);

      // 3. Set Result
      const newAd: AdResult = {
        id: Date.now().toString(),
        prompt,
        imageUrl,
        copy,
        timestamp: Date.now(),
        aspectRatio
      };
      
      setResult(newAd);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
      setStatus(AppStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-brand-darker pb-12">
      {/* Header */}
      <header className="bg-brand-dark border-b border-gray-800 sticky top-0 z-10 backdrop-blur-md bg-opacity-90">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Samayan Ad Pro</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden sm:block text-right">
                <p className="text-xs text-gray-400">Logged in as</p>
                <p className="text-sm font-medium text-brand-accent">{user.name}</p>
             </div>
             <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-primary to-purple-600 border border-white/20 shadow-md"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-12">
        {/* Welcome Text */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Hello, <span className="text-brand-primary">{user.name}</span>.
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Create professional ad creatives in seconds. Select a format and describe your vision.
          </p>
        </div>

        {/* Input & Options Area */}
        <div className="mb-16 bg-brand-dark/50 p-1 rounded-2xl">
          
          {/* Aspect Ratio Selector */}
          <div className="flex flex-col items-center mb-6 pt-4">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Select Format</label>
            <div className="flex justify-center gap-3 w-full max-w-md">
              <button 
                type="button"
                onClick={() => setAspectRatio('1:1')}
                className={`flex-1 flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                  aspectRatio === '1:1' 
                    ? 'bg-brand-primary/10 border-brand-primary text-brand-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                    : 'bg-brand-dark border-gray-700 text-gray-400 hover:border-brand-primary/50 hover:text-gray-300'
                }`}
              >
                <div className="w-5 h-5 border-2 border-current rounded-sm"></div>
                <span className="text-sm font-medium">Square</span>
              </button>
              
              <button 
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`flex-1 flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                  aspectRatio === '16:9' 
                    ? 'bg-brand-primary/10 border-brand-primary text-brand-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                    : 'bg-brand-dark border-gray-700 text-gray-400 hover:border-brand-primary/50 hover:text-gray-300'
                }`}
              >
                <div className="w-7 h-4 border-2 border-current rounded-sm"></div>
                <span className="text-sm font-medium">Landscape</span>
              </button>
              
              <button 
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`flex-1 flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                  aspectRatio === '9:16' 
                    ? 'bg-brand-primary/10 border-brand-primary text-brand-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                    : 'bg-brand-dark border-gray-700 text-gray-400 hover:border-brand-primary/50 hover:text-gray-300'
                }`}
              >
                <div className="w-4 h-7 border-2 border-current rounded-sm"></div>
                <span className="text-sm font-medium">Portrait</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="relative pb-4 px-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary via-blue-500 to-brand-accent rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-brand-darker rounded-xl p-2 border border-gray-700 focus-within:border-brand-primary transition-colors">
                <input 
                  type="text" 
                  className="w-full bg-transparent text-white px-4 py-4 text-lg outline-none placeholder-gray-600"
                  placeholder="Describe your ad (e.g. Neon shoes running on water...)"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={status === AppStatus.GENERATING_IMAGE || status === AppStatus.GENERATING_COPY}
                />
                <button 
                  type="submit"
                  disabled={status === AppStatus.GENERATING_IMAGE || status === AppStatus.GENERATING_COPY || !prompt.trim()}
                  className={`bg-brand-primary hover:bg-blue-600 text-white rounded-lg px-8 py-3 font-medium transition-all mx-2 whitespace-nowrap flex items-center gap-2
                    ${(status === AppStatus.GENERATING_IMAGE || status === AppStatus.GENERATING_COPY) ? 'opacity-50 cursor-not-allowed' : 'shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'}
                  `}
                >
                  {status === AppStatus.IDLE || status === AppStatus.SUCCESS || status === AppStatus.ERROR ? (
                    <>
                      <span>Create Ad</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>
                    </>
                  ) : 'Generating...'}
                </button>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="absolute -bottom-8 left-0 right-0 text-center h-6">
              {status === AppStatus.GENERATING_IMAGE && (
                <span className="text-brand-accent text-sm animate-pulse flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
                  Generating high-resolution visuals ({aspectRatio})...
                </span>
              )}
              {status === AppStatus.GENERATING_COPY && (
                <span className="text-brand-accent text-sm animate-pulse flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
                  Crafting professional copy...
                </span>
              )}
              {status === AppStatus.ERROR && (
                <span className="text-red-500 text-sm flex items-center justify-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  {errorMsg}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Results Area */}
        {result && status === AppStatus.SUCCESS && (
          <div className="mb-20 animate-fade-in-up">
             <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm uppercase tracking-wider font-semibold justify-center md:justify-start">
               <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
               Generated Result
             </div>
             <AdResultCard result={result} />
          </div>
        )}

      </main>
    </div>
  );
};

export default MainApp;