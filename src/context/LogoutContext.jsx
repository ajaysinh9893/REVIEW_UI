'use client';

import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, CheckCircle, Loader } from 'lucide-react';

const LogoutContext = createContext();

export function LogoutProvider({ children }) {
  const router = useRouter();
  const [logoutStep, setLogoutStep] = useState('idle'); // 'idle', 'confirm', 'loading', 'success'

  const handleConfirmLogout = async () => {
    // Step 1: Show loading
    setLogoutStep('loading');

    // Step 2: After 1 second, show success
    setTimeout(() => {
      setLogoutStep('success');

      // Step 3: After 2 seconds, redirect to login
      setTimeout(async () => {
        await router.push('/login');
      }, 2000);
    }, 1000);
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] animate-in fade-in duration-300" onClick={handleCancel}>
          <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/30 animate-in zoom-in duration-300" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }} onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <LogOut className="text-white" size={32} />
            </div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Confirm Logout</h2>
              <p className="text-gray-600">Are you sure you want to log out of your account?</p>
            </div>
            <div className="flex gap-3">
              <button onClick={handleCancel} className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all border border-gray-300" type="button">Cancel</button>
              <button onClick={handleConfirmLogout} className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:from-red-700 hover:to-orange-700" type="button">Yes, Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Animation Modal */}
      {logoutStep === 'loading' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] animate-in fade-in duration-300">
          <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-12 shadow-2xl border border-white/30 animate-in zoom-in duration-300" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                <Loader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600" size={32} />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Logging you out...</h3>
                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation */}
      {logoutStep === 'success' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] animate-in fade-in duration-300">
          <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-12 shadow-2xl border border-white/30 animate-in zoom-in duration-500" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl animate-in zoom-in duration-500">
                  <CheckCircle className="text-white animate-in zoom-in duration-700" size={56} strokeWidth={3} />
                </div>
              </div>
              <div className="text-center animate-in fade-in slide-in-from-bottom duration-700">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Logged Out Successfully</h2>
                <p className="text-gray-600 text-lg">See you again soon!</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full animate-in fade-in duration-1000">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-blue-800 text-sm font-semibold">Redirecting to login...</span>
              </div>
            </div>
          </div>
        </div>
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
        .duration-1000 { animation-duration: 1000ms; }
      `}</style>
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
