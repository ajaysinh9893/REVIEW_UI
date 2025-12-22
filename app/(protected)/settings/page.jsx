'use client';

import { useState, useEffect } from 'react';
import { User, Lock, Globe, Bell, SettingsIcon, Camera, Eye, EyeOff, Building2, Clock, Copy, Plus, X, Calendar, AlertCircle, Mail, Shield, Smartphone, Trash2, Check, CheckCircle, LogOut, MapPin, Chrome, Monitor, Apple, RefreshCw, Link as LinkIcon, Unlink, MessageSquare } from 'lucide-react';
import Sidebar from '@/src/components/Sidebar';

export default function Settings() {
  const [scrollY, setScrollY] = useState(0);
  const fadeDistance = 80; // Smaller fade distance
  const fadeOpacity = Math.max(0, 1 - scrollY / fadeDistance);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [activeSection, setActiveSection] = useState('profile');
  
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [currentEmail, setCurrentEmail] = useState('john.doe@example.com');
  const [newEmail, setNewEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  
  // Prevent body scroll when delete modal is open
  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showDeleteModal]);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const connectedMethods = [
    {
      id: 1,
      provider: 'Google',
      email: 'john.doe@gmail.com',
      connected: true,
      icon: <Globe size={24} />,
      color: 'red',
      connectedDate: 'Jan 15, 2024'
    },
    {
      id: 2,
      provider: 'Apple',
      email: 'john.doe@icloud.com',
      connected: false,
      icon: <Apple size={24} />,
      color: 'gray',
      connectedDate: null
    },
    {
      id: 3,
      provider: 'Microsoft',
      email: null,
      connected: false,
      icon: <Monitor size={24} />,
      color: 'blue',
      connectedDate: null
    }
  ];

  const activeSessions = [
    {
      id: 1,
      device: 'Chrome on MacBook Pro',
      icon: <Chrome size={20} />,
      location: 'New York, USA',
      ip: '192.168.1.1',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone 14',
      icon: <Smartphone size={20} />,
      location: 'New York, USA',
      ip: '192.168.1.45',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: 3,
      device: 'Chrome on Windows PC',
      icon: <Monitor size={20} />,
      location: 'Los Angeles, USA',
      ip: '192.168.2.10',
      lastActive: '3 days ago',
      current: false
    }
  ];

  const handleChangePassword = () => {
    // Password change logic here
    console.log('Password changed');
    setShowChangePassword(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLogoutAll = () => {
    if (confirm('Are you sure you want to logout from all devices?')) {
      console.log('Logging out from all sessions');
    }
  };

  const handleLogoutSession = (sessionId) => {
    if (confirm('Are you sure you want to logout from this device?')) {
      console.log('Logging out session:', sessionId);
    }
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === 'DELETE') {
      console.log('Account deleted');
      setShowDeleteModal(false);
    }
  };

  const handleVerifyEmail = () => {
    console.log('Verification email sent');
  };

  const handleChangeEmail = () => {
    console.log('Email change requested:', newEmail);
    setNewEmail('');
  };
  
  const [settings, setSettings] = useState({
    // Profile
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    businessName: 'Acme Corp',
    location: 'New York, NY',
    
    // Language & Region
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    
    // Notifications
    emailNotifications: true,
    reviewAlerts: true,
    weeklyReport: true,
    pushNotifications: false,
    
    // Google Business
    businessPhone: '+1 (555) 123-4567',
    businessAddress: '123 Main Street, New York, NY 10001',
    businessCity: 'New York',
    businessState: 'NY',
    businessZip: '10001',
    businessWebsite: 'https://example.com',
    verificationStatus: 'verified',
    openingHours: {
      monday: { enabled: true, periods: [{ open: '09:00', close: '17:00' }] },
      tuesday: { enabled: true, periods: [{ open: '09:00', close: '17:00' }] },
      wednesday: { enabled: true, periods: [{ open: '09:00', close: '17:00' }] },
      thursday: { enabled: true, periods: [{ open: '09:00', close: '17:00' }] },
      friday: { enabled: true, periods: [{ open: '09:00', close: '17:00' }] },
      saturday: { enabled: true, periods: [{ open: '10:00', close: '15:00' }] },
      sunday: { enabled: false, periods: [{ open: '09:00', close: '17:00' }] }
    },
    
    // Dashboard
    autoRefresh: true,
    compactMode: false
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Settings saved:', settings);
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Lock },
    { id: 'google-business', label: 'Google Business', icon: Building2 },
    { id: 'language', label: 'Language & Region', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon }
  ];

  return (
    <div className="min-h-screen font-sans" style={{ color: '#141413' }}>
      <Sidebar />
      
      <div className="overflow-auto">
        <div className="p-10 pr-24">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Settings
              </h1>
              <p className="opacity-70">
                Manage your account settings and preferences
              </p>
            </div>

            <div className="flex gap-8">
              {/* Left Sidebar Navigation */}
              <div className="w-64 flex-shrink-0 p-4 h-fit sticky top-6">
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                          activeSection === section.id
                            ? 'bg-indigo-50 text-indigo-700 font-medium'
                            : 'hover:bg-gray-50'
                        }`}
                        style={activeSection !== section.id ? { color: '#141413' } : {}}
                      >
                        <Icon size={20} />
                        <span>{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Main Content Area */}
              <div className="flex-1">
                {/* Profile Section */}
                {activeSection === 'profile' && (
                  <div className="p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2 text-gray-900">
                        Profile
                      </h2>
                      <p className="text-sm text-gray-600">
                        Manage your personal information and business details
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Profile Picture */}
                      <div className="flex items-center gap-6 pb-6">
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {settings.fullName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all">
                            <Camera size={16} />
                          </button>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1 text-gray-900">
                            Profile Picture
                          </h3>
                          <p className="text-sm mb-3 text-gray-600">
                            PNG, JPG up to 5MB
                          </p>
                          <button className="text-sm font-medium px-4 py-2 rounded-lg transition-all bg-gray-100 text-gray-700 hover:bg-gray-200">
                            Upload New Photo
                          </button>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={settings.fullName}
                            onChange={(e) => handleSettingChange('fullName', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => handleSettingChange('email', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={settings.phone}
                            onChange={(e) => handleSettingChange('phone', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Business Name
                          </label>
                          <input
                            type="text"
                            value={settings.businessName}
                            onChange={(e) => handleSettingChange('businessName', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Location
                          </label>
                          <input
                            type="text"
                            value={settings.location}
                            onChange={(e) => handleSettingChange('location', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                            placeholder="City, State"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-6">
                        <button 
                          onClick={handleSaveSettings}
                          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Section */}
                {activeSection === 'account' && (
                  <div className="p-8">
                    <div className="space-y-6">
                      {/* Login Email Section */}
                      <div className="rounded-xl border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                              <Mail className="text-indigo-600" size={24} />
                            </div>
                            <div>
                              <h2 className="text-lg font-semibold text-gray-900">Login Email</h2>
                              <p className="text-sm text-gray-600">Manage your primary email address</p>
                            </div>
                          </div>
                          {isEmailVerified ? (
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-lg">
                              <CheckCircle size={16} />
                              Verified
                            </span>
                          ) : (
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 text-sm font-medium rounded-lg">
                              <AlertCircle size={16} />
                              Not Verified
                            </span>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Email</label>
                            <input
                              type="email"
                              value={currentEmail}
                              disabled
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                            />
                          </div>

                          {!isEmailVerified && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-amber-900 mb-2">Email verification required</p>
                                  <p className="text-sm text-amber-700 mb-3">Please verify your email address to secure your account</p>
                                  <button
                                    onClick={handleVerifyEmail}
                                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all text-sm font-medium"
                                  >
                                    Send Verification Email
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Email Address</label>
                            <div className="flex gap-3">
                              <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="Enter new email address"
                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              />
                              <button
                                onClick={handleChangeEmail}
                                disabled={!newEmail}
                                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Change Email
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Change Password Section */}
                      <div className="rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Lock className="text-purple-600" size={24} />
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
                            <p className="text-sm text-gray-600">Update your password regularly for security</p>
                          </div>
                        </div>

                        {!showChangePassword ? (
                          <button
                            onClick={() => setShowChangePassword(true)}
                            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium"
                          >
                            Change Password
                          </button>
                        ) : (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                              <div className="relative">
                                <input
                                  type={showCurrentPassword ? 'text' : 'password'}
                                  value={passwordForm.currentPassword}
                                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  placeholder="Enter current password"
                                />
                                <button
                                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                              <div className="relative">
                                <input
                                  type={showNewPassword ? 'text' : 'password'}
                                  value={passwordForm.newPassword}
                                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  placeholder="Enter new password"
                                />
                                <button
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                              <div className="relative">
                                <input
                                  type={showConfirmPassword ? 'text' : 'password'}
                                  value={passwordForm.confirmPassword}
                                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  placeholder="Confirm new password"
                                />
                                <button
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                              </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                              <button
                                onClick={handleChangePassword}
                                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium"
                              >
                                Update Password
                              </button>
                              <button
                                onClick={() => {
                                  setShowChangePassword(false);
                                  setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                }}
                                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Connected Login Methods */}
                      <div className="rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <LinkIcon className="text-green-600" size={24} />
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900">Connected Login Methods</h2>
                            <p className="text-sm text-gray-600">Link your account with third-party services</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {connectedMethods.map((method) => (
                            <div
                              key={method.id}
                              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 bg-${method.color}-100 rounded-lg flex items-center justify-center text-${method.color}-600`}>
                                  {method.icon}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">{method.provider}</h3>
                                  {method.connected ? (
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm text-gray-600">{method.email}</p>
                                      <span className="text-xs text-gray-500">• Connected {method.connectedDate}</span>
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-500">Not connected</p>
                                  )}
                                </div>
                              </div>

                              {method.connected ? (
                                <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all font-medium">
                                  <Unlink size={16} />
                                  Disconnect
                                </button>
                              ) : (
                                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium">
                                  <LinkIcon size={16} />
                                  Connect
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Active Sessions */}
                      <div className="rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Shield className="text-blue-600" size={24} />
                            </div>
                            <div>
                              <h2 className="text-lg font-semibold text-gray-900">Active Sessions</h2>
                              <p className="text-sm text-gray-600">Manage where you're signed in</p>
                            </div>
                          </div>
                          <button
                            onClick={handleLogoutAll}
                            className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all font-medium"
                          >
                            <LogOut size={16} />
                            Logout All Sessions
                          </button>
                        </div>

                        <div className="space-y-3">
                          {activeSessions.map((session) => (
                            <div
                              key={session.id}
                              className={`p-4 border rounded-lg ${
                                session.current
                                  ? 'border-indigo-300 bg-indigo-50'
                                  : 'border-gray-200 hover:bg-gray-50'
                              } transition-all`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                                    {session.icon}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold text-gray-900">{session.device}</h3>
                                      {session.current && (
                                        <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-medium rounded">
                                          Current
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                      <span className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        {session.location}
                                      </span>
                                      <span>IP: {session.ip}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Last active: {session.lastActive}</p>
                                  </div>
                                </div>

                                {!session.current && (
                                  <button
                                    onClick={() => handleLogoutSession(session.id)}
                                    className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
                                  >
                                    Logout
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delete Account */}
                      <div className="rounded-xl border border-red-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <Trash2 className="text-red-600" size={24} />
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900">Delete Account</h2>
                            <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                          </div>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                              <p className="text-sm font-medium text-red-900 mb-1">Warning: This action cannot be undone</p>
                              <p className="text-sm text-red-700">
                                Deleting your account will permanently remove all your data, including contacts, reviews, and settings. This action is irreversible.
                              </p>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Delete Account Modal */}
                {showDeleteModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="rounded-xl shadow-2xl max-w-md w-full border border-gray-200 overflow-hidden" style={{ backgroundColor: '#FAF9F5' }}>
                      {/* Modal Header */}
                      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl" style={{ backgroundColor: '#FAF9F5' }}>
                        <h2 className="text-xl font-bold text-gray-900">Confirm Account Deletion</h2>
                        <button
                          onClick={() => {
                            setShowDeleteModal(false);
                            setDeleteConfirmText('');
                          }}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X size={24} />
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="p-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                              <p className="text-sm font-medium text-red-900 mb-2">This will permanently delete:</p>
                              <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                                <li>Your account and profile information</li>
                                <li>All contacts and business data</li>
                                <li>Review history and responses</li>
                                <li>All connected integrations</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Type <span className="font-bold text-red-600">DELETE</span> to confirm:
                          </label>
                          <input
                            type="text"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Type DELETE"
                          />
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setShowDeleteModal(false);
                              setDeleteConfirmText('');
                            }}
                            className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleDeleteAccount}
                            disabled={deleteConfirmText !== 'DELETE'}
                            className="flex-1 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Google Business Section */}
                {activeSection === 'google-business' && (
                  <div className="p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2 text-gray-900">
                        Google Business Profile
                      </h2>
                      <p className="text-sm text-gray-600">
                        Manage your business information and hours
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Business Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">
                          Business Information
                        </h3>
                        <div className="space-y-5">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              Business Phone
                            </label>
                            <input
                              type="tel"
                              value={settings.businessPhone}
                              onChange={(e) => handleSettingChange('businessPhone', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              Website
                            </label>
                            <input
                              type="url"
                              value={settings.businessWebsite}
                              onChange={(e) => handleSettingChange('businessWebsite', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                              placeholder="https://example.com"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              Address
                            </label>
                            <input
                              type="text"
                              value={settings.businessAddress}
                              onChange={(e) => handleSettingChange('businessAddress', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                              placeholder="123 Main Street"
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-700">
                                City
                              </label>
                              <input
                                type="text"
                                value={settings.businessCity}
                                onChange={(e) => handleSettingChange('businessCity', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-700">
                                State
                              </label>
                              <input
                                type="text"
                                value={settings.businessState}
                                onChange={(e) => handleSettingChange('businessState', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                                maxLength="2"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-700">
                                ZIP Code
                              </label>
                              <input
                                type="text"
                                value={settings.businessZip}
                                onChange={(e) => handleSettingChange('businessZip', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Verification Status */}
                      <div className="p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium mb-1 text-gray-900">
                              Verification Status
                            </h4>
                            <p className="text-sm text-gray-600">
                              {settings.verificationStatus === 'verified' ? '✓ Business is verified' : 'Pending verification'}
                            </p>
                          </div>
                          <select
                            value={settings.verificationStatus}
                            onChange={(e) => handleSettingChange('verificationStatus', e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                          >
                            <option value="verified">Verified</option>
                            <option value="pending">Pending</option>
                            <option value="unverified">Unverified</option>
                          </select>
                        </div>
                      </div>

                      {/* Business Hours */}
                      <div className="space-y-6">
                        <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <Clock className="text-white" size={24} />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  Opening Hours
                                </h3>
                                <p className="text-sm text-gray-600">
                                  Set your business operating hours
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => {
                                const newHours = {};
                                Object.keys(settings.openingHours).forEach(day => {
                                  newHours[day] = {
                                    enabled: true,
                                    periods: [{ open: '00:00', close: '23:59' }]
                                  };
                                });
                                handleSettingChange('openingHours', newHours);
                              }}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all bg-white text-gray-700 hover:bg-indigo-600 hover:text-white border border-gray-200 hover:border-indigo-600"
                            >
                              <Clock size={16} />
                              Open 24/7
                            </button>
                            
                            <button
                              onClick={() => {
                                const newHours = { ...settings.openingHours };
                                const weekendsClosed = !newHours.saturday.enabled && !newHours.sunday.enabled;
                                
                                if (weekendsClosed) {
                                  // Open weekends with same hours as previous weekday
                                  const fridayHours = newHours.friday.periods;
                                  newHours.saturday = { enabled: true, periods: JSON.parse(JSON.stringify(fridayHours)) };
                                  newHours.sunday = { enabled: true, periods: JSON.parse(JSON.stringify(fridayHours)) };
                                } else {
                                  // Close weekends
                                  newHours.saturday = { ...newHours.saturday, enabled: false };
                                  newHours.sunday = { ...newHours.sunday, enabled: false };
                                }
                                
                                handleSettingChange('openingHours', newHours);
                              }}
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all bg-white border ${
                                !settings.openingHours.saturday.enabled && !settings.openingHours.sunday.enabled
                                  ? 'text-green-700 hover:bg-green-600 hover:text-white border-gray-200 hover:border-green-600'
                                  : 'text-red-700 hover:bg-red-600 hover:text-white border-gray-200 hover:border-red-600'
                              }`}
                            >
                              <Calendar size={16} />
                              {!settings.openingHours.saturday.enabled && !settings.openingHours.sunday.enabled ? 'Open Weekends' : 'Close Weekends'}
                            </button>
                          </div>
                        </div>

                        {/* Opening Hours Table */}
                        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
                          {Object.entries(settings.openingHours).map(([dayKey, dayData], index) => {
                            const dayLabels = { monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun' };
                            
                            return (
                              <div
                                key={dayKey}
                                className={`flex items-center gap-3 p-4 ${
                                  index !== 6 ? 'border-b border-gray-200' : ''
                                } ${dayData.enabled ? 'bg-white' : 'bg-gray-50 opacity-50'}`}
                              >
                                {/* Toggle + Day Name */}
                                <div className="flex items-center gap-3 w-28">
                                  <button
                                    onClick={() => {
                                      const newHours = { ...settings.openingHours };
                                      newHours[dayKey] = { ...newHours[dayKey], enabled: !newHours[dayKey].enabled };
                                      handleSettingChange('openingHours', newHours);
                                    }}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                      dayData.enabled ? 'bg-indigo-600' : 'bg-gray-300'
                                    }`}
                                  >
                                    <span
                                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                        dayData.enabled ? 'translate-x-5' : 'translate-x-1'
                                      }`}
                                    />
                                  </button>
                                  <span className="text-sm font-medium text-gray-700">
                                    {dayLabels[dayKey]}
                                  </span>
                                </div>

                                {/* Time Periods */}
                                {dayData.enabled ? (
                                  <div className="flex-1 flex items-center gap-2">
                                    {dayData.periods.map((period, periodIndex) => (
                                      <div key={periodIndex} className="flex items-center gap-2">
                                        <input
                                          type="time"
                                          value={period.open}
                                          onChange={(e) => {
                                            const newHours = { ...settings.openingHours };
                                            newHours[dayKey].periods[periodIndex].open = e.target.value;
                                            handleSettingChange('openingHours', newHours);
                                          }}
                                          className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                        <span className="text-sm text-gray-400">-</span>
                                        <input
                                          type="time"
                                          value={period.close}
                                          onChange={(e) => {
                                            const newHours = { ...settings.openingHours };
                                            newHours[dayKey].periods[periodIndex].close = e.target.value;
                                            handleSettingChange('openingHours', newHours);
                                          }}
                                          className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                        {dayData.periods.length > 1 && (
                                          <button
                                            onClick={() => {
                                              const newHours = { ...settings.openingHours };
                                              newHours[dayKey].periods = newHours[dayKey].periods.filter((_, idx) => idx !== periodIndex);
                                              handleSettingChange('openingHours', newHours);
                                            }}
                                            className="p-1 rounded hover:bg-red-100 text-red-500 transition-colors"
                                            title="Remove period"
                                          >
                                            <X size={16} />
                                          </button>
                                        )}
                                      </div>
                                    ))}
                                    
                                    {/* Add Period */}
                                    <button
                                      onClick={() => {
                                        const newHours = { ...settings.openingHours };
                                        newHours[dayKey].periods.push({ open: '09:00', close: '17:00' });
                                        handleSettingChange('openingHours', newHours);
                                      }}
                                      className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                      title="Add split hours"
                                    >
                                      <Plus size={16} />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex-1">
                                    <span className="text-sm text-gray-400">
                                      Closed
                                    </span>
                                  </div>
                                )}

                                {/* Copy Button */}
                                {dayData.enabled && (
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => {
                                        const newHours = { ...settings.openingHours };
                                        Object.keys(settings.openingHours).forEach(day => {
                                          // Only copy to days that are currently enabled
                                          if (newHours[day].enabled) {
                                            newHours[day].periods = JSON.parse(JSON.stringify(dayData.periods));
                                          }
                                        });
                                        handleSettingChange('openingHours', newHours);
                                      }}
                                      className="px-3 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors flex items-center gap-1"
                                      title="Copy to all open days"
                                    >
                                      <Copy size={14} />
                                      All
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Info Message */}
                        <div className="flex items-start gap-2 p-3 rounded-lg text-sm bg-blue-50 text-blue-700 border border-blue-200">
                          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                          <p>Use <strong>+</strong> to add split hours (e.g., lunch breaks). Click <strong>Copy to All</strong> to apply hours to all open days only.</p>
                        </div>
                      </div>

                      <div className="flex justify-end pt-6">
                        <button 
                          onClick={handleSaveSettings}
                          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Language & Region Section */}
                {activeSection === 'language' && (
                  <div className="p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2 text-gray-900">
                        Language & Region
                      </h2>
                      <p className="text-sm text-gray-600">
                        Set your language, timezone, and regional preferences
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Language
                        </label>
                        <select
                          value={settings.language}
                          onChange={(e) => handleSettingChange('language', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="zh">中文</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Timezone
                        </label>
                        <select
                          value={settings.timezone}
                          onChange={(e) => handleSettingChange('timezone', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Date Format
                        </label>
                        <select
                          value={settings.dateFormat}
                          onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>

                      <div className="flex justify-end pt-6">
                        <button 
                          onClick={handleSaveSettings}
                          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Section */}
                {activeSection === 'notifications' && (
                  <div className="p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2 text-gray-900">
                        Notifications
                      </h2>
                      <p className="text-sm text-gray-600">
                        Manage how you receive updates and alerts
                      </p>
                    </div>

                    <div className="space-y-4">
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
                        { key: 'reviewAlerts', label: 'New Review Alerts', desc: 'Get notified when new reviews are posted' },
                        { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive a summary email every week' }
                      ].map((item) => (
                        <div key={item.key} className="p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium mb-1 text-gray-900">
                                {item.label}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {item.desc}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings[item.key]}
                                onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preferences Section */}
                {activeSection === 'preferences' && (
                  <div className="p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2 text-gray-900">
                        Dashboard Preferences
                      </h2>
                      <p className="text-sm text-gray-600">
                        Customize your dashboard behavior and features
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium mb-1 text-gray-900">
                              Auto Refresh
                            </h4>
                            <p className="text-sm text-gray-600">
                              Automatically refresh dashboard data
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.autoRefresh}
                              onChange={(e) => handleSettingChange('autoRefresh', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium mb-1 text-gray-900">
                              Compact Mode
                            </h4>
                            <p className="text-sm text-gray-600">
                              Show more information in less space
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.compactMode}
                              onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
