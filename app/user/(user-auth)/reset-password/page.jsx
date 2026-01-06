'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function ResetPassword() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!formData.newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Password reset successfully');
        setIsSubmitting(false);
        // Redirect to success page
        router.push('/user/password-reset-success');
      }, 1000);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;

    const levels = [
      { strength: 1, label: 'Weak', color: 'bg-red-500' },
      { strength: 2, label: 'Fair', color: 'bg-orange-500' },
      { strength: 3, label: 'Good', color: 'bg-yellow-500' },
      { strength: 4, label: 'Strong', color: 'bg-green-500' },
      { strength: 5, label: 'Very Strong', color: 'bg-green-600' }
    ];

    return levels[strength - 1] || { strength: 0, label: '', color: '' };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

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
              <Lock size={48} className="text-indigo-600" />
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Reset your password</h1>
            <p className="text-base text-gray-500">Create a new secure password for your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="enter your new password"
                  className={`w-full px-4 py-3 text-base border ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full ${
                          level <= passwordStrength.strength ? passwordStrength.color : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    Password strength: <span className="font-semibold">{passwordStrength.label}</span>
                  </p>
                </div>
              )}
              
              {errors.newPassword && (
                <p className="mt-1.5 text-sm text-red-600">{errors.newPassword}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="confirm your new password"
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

            {/* Password Requirements */}
            <div className="bg-gray-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-700 mb-2">Password must contain:</p>
              <ul className="space-y-1 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <span className={formData.newPassword.length >= 8 ? 'text-green-600' : ''}>✓</span>
                  At least 8 characters
                </li>
                <li className="flex items-center gap-2">
                  <span className={/(?=.*[a-z])/.test(formData.newPassword) ? 'text-green-600' : ''}>✓</span>
                  One lowercase letter
                </li>
                <li className="flex items-center gap-2">
                  <span className={/(?=.*[A-Z])/.test(formData.newPassword) ? 'text-green-600' : ''}>✓</span>
                  One uppercase letter
                </li>
                <li className="flex items-center gap-2">
                  <span className={/(?=.*\d)/.test(formData.newPassword) ? 'text-green-600' : ''}>✓</span>
                  One number
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-indigo-600 text-white text-base font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              ← Back to Login
            </button>
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
