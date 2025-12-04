import React, { useState } from 'react';
import { AdResult } from '../types';

interface AdResultCardProps {
  result: AdResult;
}

const AdResultCard: React.FC<AdResultCardProps> = ({ result }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="w-full animate-fade-in-up">
      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 cursor-pointer"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-7xl max-h-screen w-full h-full flex items-center justify-center">
             <img 
               src={result.imageUrl} 
               alt={result.prompt} 
               className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
             />
             <button className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/30 rounded-full p-2 transition backdrop-blur-md">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
             <div className="absolute bottom-8 left-0 right-0 text-center text-white/50 text-sm pointer-events-none">
               Click anywhere to close
             </div>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-brand-dark border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Image Section */}
        <div 
          className="w-full md:w-1/2 relative group bg-black/80 min-h-[400px] flex items-center justify-center p-2 cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
            <img 
              src={result.imageUrl} 
              alt="Generated Ad" 
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
            
            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-brand-primary/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg pointer-events-none flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
              Zoom
            </div>
        </div>

        {/* Copy Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-brand-dark to-brand-darker">
          <div className="mb-6">
             <span className="inline-block px-2 py-1 bg-brand-primary/10 text-brand-accent text-xs font-bold uppercase tracking-wider rounded mb-3">
               Ad Copy
             </span>
             <div className="uppercase tracking-wide text-sm text-gray-400 font-semibold mb-2">
               {result.copy.tagline}
             </div>
             <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
               {result.copy.headline}
             </h2>
             <p className="text-gray-300 leading-relaxed border-l-2 border-brand-primary/30 pl-4 py-1">
               {result.copy.body}
             </p>
          </div>
          
          <div className="mt-auto pt-6 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4">
            <span className="inline-block bg-brand-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-sm transition shadow-lg shadow-brand-primary/20 cursor-default">
              {result.copy.callToAction}
            </span>
            
            <a 
              href={result.imageUrl} 
              download={`samayan-ad-${result.id}.png`}
              className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition group"
              title="Download Image"
            >
              <span className="group-hover:underline">Download Asset</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-y-0.5 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdResultCard;