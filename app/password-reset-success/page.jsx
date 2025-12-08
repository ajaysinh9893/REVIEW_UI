'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function PasswordResetSuccess() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to login
          router.push('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleLoginNow = () => {
    // Redirect to login page
    console.log('Redirecting to login...');
    router.push('/login');
  };

  return (
    <layout>

<div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">K</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Kinety</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Success Icon with Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
                <CheckCircle size={48} className="text-green-600" />
              </div>
              {/* Ripple Effect */}
              <div className="absolute inset-0 w-24 h-24 bg-green-200 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Password reset successful!</h1>
            <p className="text-base text-gray-500">
              Your password has been successfully reset. You can now log in with your new password.
            </p>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Secure Password Set</p>
                  <p className="text-xs text-gray-600 mt-1">Your account is now protected with your new password</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Account Verified</p>
                  <p className="text-xs text-gray-600 mt-1">All security checks passed successfully</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Ready to Login</p>
                  <p className="text-xs text-gray-600 mt-1">You can now access your account</p>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-redirect Notice */}
          {countdown > 0 && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-indigo-800 text-center">
                Redirecting to login in <span className="font-bold text-lg">{countdown}</span> seconds...
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleLoginNow}
              className="w-full py-3.5 bg-indigo-600 text-white text-base font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Log In Now
              <ArrowRight size={20} />
            </button>

            <Link href="/" className="w-full py-3 text-indigo-600 text-base font-medium hover:text-indigo-700 transition-colors block text-center">
              Go to Homepage
            </Link>
          </div>

          {/* Security Tip */}
          <div className="mt-8 p-4 bg-gray-100 rounded-xl">
            <p className="text-xs text-gray-700 font-semibold mb-2">Security Tip:</p>
            <p className="text-xs text-gray-600">
              Make sure to keep your password safe and don&apos;t share it with anyone. 
              Consider using a password manager to store it securely.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500">© 2025 Kinety. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
    </layout>
  );
}
