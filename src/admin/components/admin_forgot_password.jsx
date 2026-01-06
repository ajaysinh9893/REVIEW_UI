'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function AdminForgotPasswordComponent() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!email) {
        setError('Please enter your email address');
        return;
      }

      // TODO: Add actual password reset email logic
      console.log('Admin password reset requested for:', email);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-2xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
              <CheckCircle className="text-white" size={32} />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
            <p className="text-gray-400 mb-6">
              We've sent a password reset link to <span className="text-white font-medium">{email}</span>
            </p>

            <div className="bg-gray-700/50 p-4 rounded-lg mb-6 text-sm text-gray-300 space-y-2">
              <p>• Check your inbox for an email from us</p>
              <p>• Click the link in the email to reset your password</p>
              <p>• The link expires in 24 hours</p>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              Didn't receive the email?{' '}
              <button
                onClick={() => setSubmitted(false)}
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Try again
              </button>
            </p>

            <Link
              href="/admin/auth/login"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Forgot Password?</h1>
          <p className="text-gray-400">Enter your email to receive a reset link</p>
        </div>

        {/* Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-2xl">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-700 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Enter the email address associated with your admin account
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium rounded-lg transition-colors mt-6"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Back to Login */}
          <Link
            href="/admin/auth/login"
            className="w-full py-2 px-4 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 font-medium rounded-lg transition-colors text-center flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
