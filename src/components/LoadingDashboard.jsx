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
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center z-[9999]">
      <div className="text-center">
        {/* Dashboard Icon Animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer spinning circle - Google Blue */}
          <div className="absolute inset-0 border-4 border-blue-100 border-t-[#4285F4] rounded-full animate-spin"></div>
          
          {/* Middle spinning circle - Google Red (opposite direction) */}
          <div className="absolute inset-4 border-4 border-red-100 border-b-[#EA4335] rounded-full animate-spin-reverse"></div>
          
          {/* Inner pulsing circle - Rapid Google color gradient changes */}
          <div className="absolute inset-8 rounded-full animate-google-gradient flex items-center justify-center">
            <BarChart3 className="text-white" size={32} />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          {message || 'Loading Dashboard'}
        </h2>
        
        {/* Bouncing Dots */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-3 h-3 bg-[#4285F4] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-[#EA4335] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-[#34A853] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
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

        @keyframes google-colors {
          0% { background: #4285F4; }
          25% { background: #EA4335; }
          50% { background: #FBBC04; }
          75% { background: #34A853; }
          100% { background: #4285F4; }
        }

        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }

        .animate-google-gradient {
          animation: google-colors 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
