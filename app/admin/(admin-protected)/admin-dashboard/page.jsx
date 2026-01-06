'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart3, Users, TrendingUp, AlertCircle, LogOut, Settings, Menu, X } from 'lucide-react';
import AdminSidebar from '@/src/admin/components/admin_sidebar';

export default function AdminDashboard() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => {
              document.cookie = 'authToken=; max-age=0';
              window.location.href = '/admin/login';
            }}>
              <LogOut size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Admin Panel</h2>
            <p className="text-gray-600">Manage your platform, users, and business settings</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">1,234</p>
                </div>
                <Users size={32} className="text-indigo-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Reviews</p>
                  <p className="text-3xl font-bold text-gray-900">567</p>
                </div>
                <BarChart3 size={32} className="text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
                  <p className="text-3xl font-bold text-gray-900">12.5%</p>
                </div>
                <TrendingUp size={32} className="text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Tasks</p>
                  <p className="text-3xl font-bold text-gray-900">23</p>
                </div>
                <AlertCircle size={32} className="text-orange-600" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/admin/users" className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg hover:shadow-md transition-all text-center">
                <Users size={24} className="text-indigo-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Manage Users</span>
              </Link>
              <Link href="/admin/analytics" className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-all text-center">
                <BarChart3 size={24} className="text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Analytics</span>
              </Link>
              <Link href="/admin/settings" className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition-all text-center">
                <Settings size={24} className="text-purple-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Settings</span>
              </Link>
              <button className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-all text-center" onClick={() => {
                document.cookie = 'authToken=; max-age=0';
                window.location.href = '/admin/login';
              }}>
                <LogOut size={24} className="text-gray-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
