'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function CreateAccount() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Account created successfully!');
      // Navigate to email verification page
      router.push('/user/email-verification');
    }
  };

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
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Already have an account?</span>
            <Link href="/user/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Title Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Create account</h1>
            <p className="text-base text-gray-500">Enter your details to create your account.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className={`w-full px-4 py-3 text-base border ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400`}
              />
              {errors.fullName && (
                <p className="mt-1.5 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. username@kinety.com"
                className={`w-full px-4 py-3 text-base border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400`}
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="enter your password"
                  className={`w-full px-4 py-3 text-base border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="confirm your password"
                  className={`w-full px-4 py-3 text-base border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 text-white text-base font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm mt-8"
            >
              Create Account
            </button>
          </form>

          {/* Terms */}
          <p className="text-center text-xs text-gray-500 mt-6">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Privacy Policy
            </a>
          </p>
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
