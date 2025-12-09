'use client';

import { useState } from 'react';
import { User, Settings, Lock } from 'lucide-react';
import Sidebar from '@/src/components/Sidebar';

export default function ReviewProfile() {
  const [formData, setFormData] = useState({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    username: 'janedoe123',
    phone: '+1 (555) 123-4567',
    address: '123 Business Blvd\nSuite 400\nCityville, State 12345\nCountryland',
    bio: 'Passionate about empowering businesses with innovative technology solutions. Focused on optimizing digital presence and customer engagement.',
    linkedin: 'https://linkedin.com/in/janedoe',
    twitter: 'https://twitter.com/janedoe',
    github: 'GitHub Profile URL',
    role: 'Digital Marketing Specialist',
    emailNotifications: true,
    smsNotifications: false,
    businessName: 'Innovate Digital Solutions',
    businessPhone: '+1 (555) 987-6543',
    businessWebsite: 'https://innovatedigital.com',
    businessAddress: '789 Tech Drive\nInnovation Hub, CA 90210\nUSA',
    hoursOfOperation: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat-Sun: Closed',
    categories: 'Software Company, Digital Marketing Agency',
    businessDescription: 'Innovate Digital Solutions is a leading provider of comprehensive digital marketing and software development services, helping businesses thrive online.',
    googlePlaceId: 'ChIJOvXEc-Vw4jQRBL_e.5J9P7Q'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    alert('Profile saved successfully!');
  };

  // Sample data - replace with API calls in future
  const normalReviews = [
    {
      id: 1,
      name: 'Alice Johnson',
      rating: 5,
      date: '2 days ago',
      comment: 'RepuScope AI has transformed how we manage our online presence. The sentiment analysis is spot on and the actionable insights are truly invaluable.',
      sentiment: 'Positive',
      replied: true,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
    },
    {
      id: 2,
      name: 'Bob Williams',
      rating: 4,
      date: '3 days ago',
      comment: 'Great tool, though the keyword suggestions could be more granular. Still, a massive time-saver for filtering and responding to reviews efficiently.',
      sentiment: 'Neutral',
      replied: false,
      image: null
    }
  ];

  const userProfile = {
    name: 'John Doe',
    role: 'Business Owner',
    email: 'john@example.com',
    location: 'New York, USA',
    memberSince: 'January 2024'
  };

  // Utility functions
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
      />
    ));
  };

  const openReplyModal = (review) => {
    setReplyModal({ open: true, review });
  };

  const closeReplyModal = () => {
    setReplyModal({ open: false, review: null });
    setSelectedReply('');
  };

  const handleSendReply = () => {
    console.log('Reply sent:', selectedReply);
    alert('Reply sent successfully!');
    closeReplyModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      {/* Main Content */}
      <div className="ml-72 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-10 py-5 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
          <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all">
            <Settings size={22} className="text-gray-600" />
          </button>
        </div>

        <div className="p-10 max-w-7xl mx-auto">
          {/* User Profile Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-8">User Profile</h2>

            {/* Profile Photo */}
            <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-pink-400 rounded-full flex items-center justify-center shadow-md">
                <User size={44} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{formData.fullName}</h3>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 mt-1 transition-colors">Upload new photo</button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2.5">Password</label>
              <button className="flex items-center gap-2.5 text-base font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                <Lock size={18} />
                <span>Change Password</span>
              </button>
            </div>

            {/* Address and Bio */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Social Links</label>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Twitter</label>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">GitHub</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Role and Notifications */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-500 mt-2.5">Map Account to Google Place (for review setup)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3.5">Notification Preferences</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-base text-gray-700">Email Notifications</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={formData.smsNotifications}
                      onChange={handleChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-base text-gray-700">SMS Notifications</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8 pt-8 border-t border-gray-200">
              <button className="px-6 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all border border-gray-300">
                Cancel
              </button>
              <button onClick={handleSave} className="px-6 py-2.5 text-base font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm">
                Save Changes
              </button>
            </div>
          </div>

          {/* Google Business Profile Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-8">Google Business Profile</h2>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Business Phone</label>
                <input
                  type="tel"
                  name="businessPhone"
                  value={formData.businessPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Business Website</label>
                <input
                  type="url"
                  name="businessWebsite"
                  value={formData.businessWebsite}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Verification Status</label>
                <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-sm font-semibold rounded-full mt-1">
                  ✓ Verified
                </span>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2.5">Business Address</label>
              <textarea
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Hours of Operation</label>
                <input
                  type="text"
                  name="hoursOfOperation"
                  value={formData.hoursOfOperation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Categories</label>
                <input
                  type="text"
                  name="categories"
                  value={formData.categories}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2.5">Business Description</label>
              <textarea
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
              />
            </div>

            {/* Photos */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3.5">Photos</label>
              <div className="grid grid-cols-3 gap-5">
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400" alt="Office" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400" alt="Team" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400" alt="Workspace" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2.5">Google Place ID</label>
              <input
                type="text"
                name="googlePlaceId"
                value={formData.googlePlaceId}
                onChange={handleChange}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-2.5">Map Business Profile to Google Place</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
              <button className="px-6 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all border border-gray-300">
                Edit Profile
              </button>
              <button className="px-6 py-2.5 text-base font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm">
                Sync from Google
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-10 py-6">
            © 2025 App Name. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
