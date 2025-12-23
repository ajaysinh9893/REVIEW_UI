'use client';

import { createContext, useContext, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Check, Loader } from 'lucide-react';
import LoadingDashboard from '@/src/components/LoadingDashboard';

const LogoutContext = createContext();

export function LogoutProvider({ children }) {
  const router = useRouter();
  const [logoutStep, setLogoutStep] = useState('idle'); // 'idle', 'confirm', 'loading', 'success'
  const redirectCompleted = useRef(false);

  const handleConfirmLogout = async () => {
    redirectCompleted.current = false;
    
    // Step 1: Show loading animation (1 second)
    setLogoutStep('loading');

    // Wait 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 2: Show success checkmark animation
    setLogoutStep('success');

    // Wait for success animation (300ms)
    await new Promise(resolve => setTimeout(resolve, 300));

    // Step 3: Redirect to login
    // Keep success prompt visible while login page loads
    await router.push('/login');
    
    // Setup cleanup function that marks redirect as complete
    const handleLoad = () => {
      if (!redirectCompleted.current) {
        redirectCompleted.current = true;
        setLogoutStep('idle');
        window.removeEventListener('load', handleLoad);
      }
    };
    
    // If page loads quickly, dismiss after max 5 seconds as fallback
    const fallbackTimeout = setTimeout(() => {
      if (!redirectCompleted.current) {
        redirectCompleted.current = true;
        setLogoutStep('idle');
        window.removeEventListener('load', handleLoad);
      }
    }, 5000);
    
    window.addEventListener('load', handleLoad);
  };

  const handleCancel = () => {
    setLogoutStep('idle');
  };

  const openLogoutConfirm = () => {
    setLogoutStep('confirm');
  };

  return (
    <LogoutContext.Provider value={{ logoutStep, setLogoutStep, handleConfirmLogout, handleCancel, openLogoutConfirm }}>
      {children}

      {/* Logout Confirmation Modal - Rendered at root level */}
      {logoutStep === 'confirm' && (
        <div className="fixed inset-0 bg-white/2 backdrop-blur-xl flex items-center justify-center z-[9999] animate-in fade-in duration-300" onClick={handleCancel}>
          <div className="rounded-xl p-5 max-w-xs w-full animate-in zoom-in duration-300 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <LogOut className="text-white" size={24} />
            </div>
            <div className="text-center mb-5">
              <h2 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Confirm Logout</h2>
              <p className="text-sm text-gray-200 drop-shadow-md">Are you sure you want to log out?</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleCancel} className="flex-1 py-2 px-3 bg-white/20 text-white rounded-lg text-sm font-semibold hover:bg-white/30 transition-all backdrop-blur-sm border border-white/30" type="button">Cancel</button>
              <button onClick={handleConfirmLogout} className="flex-1 py-2 px-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:from-red-700 hover:to-orange-700" type="button">Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Animation Modal */}
      {logoutStep === 'loading' && (
        <div className="fixed inset-0 bg-white/2 backdrop-blur-xl flex items-center justify-center z-[9999] animate-in fade-in duration-300">
          <div className="rounded-xl p-6 animate-in zoom-in duration-300 flex flex-col items-center">
            <div className="relative">
              <div className="w-14 h-14 border-3 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
              <Loader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600" size={24} />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-base font-bold text-white mb-2 drop-shadow-lg">Logging you out...</h3>
              <div className="flex justify-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce drop-shadow-md" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce drop-shadow-md" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce drop-shadow-md" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation */}
      {logoutStep === 'success' && (
        <LoadingDashboard isOpen={true} message="Logging out... Redirecting to login" />
      )}
    </LogoutContext.Provider>
  );
}

export function useLogout() {
  const context = useContext(LogoutContext);
  if (!context) {
    throw new Error('useLogout must be used within LogoutProvider');
  }
  return context;
}
}
