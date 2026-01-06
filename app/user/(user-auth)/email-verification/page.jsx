'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, CheckCircle } from 'lucide-react';

export default function EmailVerification() {
  const router = useRouter();
  const [email] = useState('username@kinety.com'); // This would come from props or context
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleResendEmail = () => {
    setIsResending(true);
    setResendSuccess(false);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setResendSuccess(true);
      console.log('Verification email resent to:', email);
    }, 1000);
  };

  useEffect(() => {
    if (resendSuccess) {
      const timer = setTimeout(() => setResendSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [resendSuccess]);

  return (
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
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
              <Mail size={48} className="text-indigo-600" />
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Verify your email</h1>
            <p className="text-base text-gray-500 mb-2">
              We&apos;ve sent a verification link to
            </p>
            <p className="text-base font-semibold text-gray-900">{email}</p>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">What to do next:</h2>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-indigo-600">1.</span>
                <span>Check your email inbox</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-indigo-600">2.</span>
                <span>Click the verification link we sent you</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-indigo-600">3.</span>
                <span>You&apos;ll be redirected to log in</span>
              </li>
            </ol>
          </div>

          {/* Success Message */}
          {resendSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-800">Email sent successfully! Check your inbox.</p>
            </div>
          )}

          {/* Resend Email */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Didn&apos;t receive the email?</p>
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="px-6 py-2.5 bg-white text-indigo-600 text-sm font-semibold border-2 border-indigo-600 rounded-xl hover:bg-indigo-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? 'Sending...' : 'Resend Verification Email'}
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-gray-100 rounded-xl">
            <p className="text-xs text-gray-600 text-center">
              <strong>Note:</strong> Check your spam folder if you don&apos;t see the email. 
              The link will expire in 24 hours.
            </p>
          </div>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <Link href="/user/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500">© 2025 Kinety. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
