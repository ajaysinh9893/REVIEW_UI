'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Password reset email sent to:', email);
      alert('Password reset link has been sent to your email!');
      setIsSubmitting(false);
      // Navigate to reset password page
      router.push('/reset-password');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="absolute top-6 right-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Don't have an account?</span>
          <Link href="/create-account" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            Register Now
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 flex items-center justify-center">
              <svg viewBox="0 0 200 120" className="w-full h-full">
                <rect x="85" y="30" width="6" height="80" fill="#374151" />
                <path d="M 95 35 L 170 35 L 175 45 L 170 55 L 95 55 Z" fill="white" stroke="#374151" strokeWidth="2" />
                <line x1="105" y1="42" x2="125" y2="42" stroke="#374151" strokeWidth="2" />
                <line x1="105" y1="48" x2="120" y2="48" stroke="#374151" strokeWidth="2" />
                <path d="M 25 55 L 85 55 L 85 75 L 25 75 L 20 65 Z" fill="white" stroke="#374151" strokeWidth="2" />
                <line x1="35" y1="62" x2="55" y2="62" stroke="#374151" strokeWidth="2" />
                <line x1="35" y1="68" x2="50" y2="68" stroke="#374151" strokeWidth="2" />
                <path d="M 60 105 Q 70 100, 80 105 T 100 105 T 120 105 T 140 105" 
                      fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
                <line x1="110" y1="105" x2="110" y2="95" stroke="#374151" strokeWidth="1.5" />
                <line x1="108" y1="102" x2="105" y2="95" stroke="#374151" strokeWidth="1.5" />
                <line x1="112" y1="102" x2="115" y2="95" stroke="#374151" strokeWidth="1.5" />
                <line x1="135" y1="105" x2="135" y2="97" stroke="#374151" strokeWidth="1.5" />
                <line x1="133" y1="103" x2="130" y2="97" stroke="#374151" strokeWidth="1.5" />
                <line x1="137" y1="103" x2="140" y2="97" stroke="#374151" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Forgot your password?</h1>
            <p className="text-base text-gray-500">Enter your email so that we can send you password reset link</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="e.g. username@kinety.com"
                className={`w-full px-4 py-3 text-base border ${
                  error ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400`}
              />
              {error && (
                <p className="mt-1.5 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-indigo-600 text-white text-base font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Email'}
            </button>

            <Link href="/login" className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors mt-6">
              <ChevronLeft size={18} />
              Back to Login
            </Link>
          </form>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500">© 2025 Kinety. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
