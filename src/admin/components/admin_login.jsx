'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail } from 'lucide-react';

export default function AdminLoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }
      
      // Create JWT token with admin role
      const token = createAdminToken({
        email: email,
        role: 'admin' // Admin login gets 'admin' role
      });
      
      // Store token in cookie (httpOnly in production)
      document.cookie = `authToken=${token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
      
      // Redirect to admin dashboard
      window.location.href = '/admin-dashboard';
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  // Function to create a JWT token for admin
  function createAdminToken(payload) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = btoa(JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
    }));
    const signature = btoa('admin-signature');
    return `${header}.${body}.${signature}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-lg mb-4">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">Access the admin panel</p>
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
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 bg-gray-700 border border-gray-600 rounded" />
                Remember me
              </label>
              <Link href="/admin/auth/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium rounded-lg transition-colors mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center mb-3">Demo Credentials</p>
            <div className="bg-gray-700/50 p-3 rounded text-sm text-gray-300 space-y-1">
              <p><span className="text-gray-400">Email:</span> admin@example.com</p>
              <p><span className="text-gray-400">Password:</span> admin123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Go back to{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
            user login
          </Link>
        </p>
      </div>
    </div>
  );
}
