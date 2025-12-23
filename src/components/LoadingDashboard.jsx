'use client';

import { BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LoadingDashboard({ isOpen, message }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    // Start slow progress immediately
    const interval = setInterval(() => {
      setProgress(prev => {
        // Progress slowly up to 90%, then wait for actual load
        if (prev < 90) {
          return prev + Math.random() * 15; // Random increments
        }
        return prev;
      });
    }, 200);

    // When page fully loads, jump to 100%
    const handleLoad = () => {
      setProgress(100);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/15 backdrop-blur-xl flex items-center justify-center z-[9999]">
      <div className="text-center bg-white border border-gray-200 rounded-2xl px-8 py-10 shadow-2xl">
        {/* Dashboard Icon Animation */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Outer spinning circle - Google Blue */}
          <div className="absolute inset-0 border-3 border-blue-100 border-t-[#4285F4] rounded-full animate-spin"></div>
          
          {/* Middle spinning circle - Google Red (opposite direction) */}
          <div className="absolute inset-3 border-3 border-red-100 border-b-[#EA4335] rounded-full animate-spin-reverse"></div>
          
          {/* Inner pulsing circle - Static Google Blue */}
          <div className="absolute inset-8 bg-[#4285F4] rounded-full animate-pulse flex items-center justify-center">
            <BarChart3 className="text-white" size={24} />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {message || 'Loading Dashboard'}
        </h2>
        
        {/* Bouncing Dots */}
        <div className="flex justify-center gap-1.5 mb-5">
          <div className="w-2 h-2 bg-[#4285F4] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-[#4285F4] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-[#4285F4] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-xs mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden flex">
            {/* Blue section */}
            <div className="flex-1 bg-[#4285F4]" style={{ display: progress >= 0 ? 'block' : 'none' }}></div>
            {/* Red section */}
            <div className="flex-1 bg-[#EA4335]" style={{ display: progress >= 25 ? 'block' : 'none' }}></div>
            {/* Yellow section */}
            <div className="flex-1 bg-[#FBBC04]" style={{ display: progress >= 50 ? 'block' : 'none' }}></div>
            {/* Green section */}
            <div className="flex-1 bg-[#34A853]" style={{ display: progress >= 75 ? 'block' : 'none' }}></div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
