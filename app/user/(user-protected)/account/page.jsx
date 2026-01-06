'use client';

import { usePrompt } from '@/src/components/user_usePrompt';
import { useState } from 'react';
import { Save } from 'lucide-react';

export default function Account() {
  const prompt = usePrompt();
  const [formData, setFormData] = useState({
    businessName: 'John&apos;s Coffee Shop',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001'
  });

  const handleSaveProfile = () => {
    prompt.showLoading('Saving your profile...');
    setTimeout(() => {
      prompt.closePrompt();
      prompt.showSuccess('Profile Updated', 'Your account information has been saved successfully.');
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ backgroundColor: '#FAF9F5' }}>
      <div className="p-4 md:p-6 lg:p-10 md:pt-8 lg:pt-20 max-w-7xl mx-auto lg:pr-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600 mb-8">Manage your account information and preferences</p>
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Business Information</h2>
            
            <div className="space-y-6">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Business Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Save Button */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt Renderer */}
      <prompt.PromptRenderer />
    </div>
  );
}
