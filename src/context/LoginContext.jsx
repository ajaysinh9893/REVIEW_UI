'use client';

import { createContext, useContext, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader } from 'lucide-react';
import LoadingDashboard from '@/src/components/LoadingDashboard';

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const router = useRouter();
  const [loginStep, setLoginStep] = useState('idle'); // 'idle', 'loading', 'success'
  const redirectCompleted = useRef(false);

  const handleLoginSuccess = async () => {
    redirectCompleted.current = false;
    
    // Step 1: Show loading animation (1 second)
    setLoginStep('loading');

    // Wait 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 2: Show success checkmark animation
    setLoginStep('success');

    // Wait for success animation (300ms)
    await new Promise(resolve => setTimeout(resolve, 300));

    // Step 3: Redirect to dashboard
    // Keep success prompt visible while dashboard loads
    await router.push('/dashboard');
    
    // Setup cleanup function that marks redirect as complete
    const handleLoad = () => {
      if (!redirectCompleted.current) {
        redirectCompleted.current = true;
        setLoginStep('idle');
        window.removeEventListener('load', handleLoad);
      }
    };
    
    // If page loads quickly, dismiss after max 5 seconds as fallback
    const fallbackTimeout = setTimeout(() => {
      if (!redirectCompleted.current) {
        redirectCompleted.current = true;
        setLoginStep('idle');
        window.removeEventListener('load', handleLoad);
      }
    }, 5000);
    
    window.addEventListener('load', handleLoad);
  };

  const openLoginPrompt = () => {
    setLoginStep('loading');
  };

  return (
    <LoginContext.Provider value={{ loginStep, setLoginStep, handleLoginSuccess, openLoginPrompt }}>
      {children}

      {/* Loading Animation Modal */}
      {loginStep === 'loading' && (
        <div className="fixed inset-0 bg-white/2 backdrop-blur-xl flex items-center justify-center z-[9999] animate-in fade-in duration-300">
          <div className="rounded-xl p-6 animate-in zoom-in duration-300 flex flex-col items-center">
            <div className="relative">
                <div className="w-14 h-14 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <Loader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={24} />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-base font-bold text-white mb-2 drop-shadow-lg">Signing you in...</h3>
                <div className="flex justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce drop-shadow-md" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce drop-shadow-md" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce drop-shadow-md" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation */}
      {loginStep === 'success' && (
        <LoadingDashboard isOpen={true} message="Welcome Back! Loading your dashboard..." />
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoom-in { from { transform: scale(0.8); } to { transform: scale(1); } }
        @keyframes slide-in-from-bottom { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-in { animation-fill-mode: both; }
        .fade-in { animation-name: fade-in; }
        .zoom-in { animation-name: zoom-in; }
        .slide-in-from-bottom { animation-name: slide-in-from-bottom; }
        .duration-300 { animation-duration: 300ms; }
        .duration-500 { animation-duration: 500ms; }
        .duration-700 { animation-duration: 700ms; }
      `}</style>
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within LoginProvider');
  }
  return context;
}
