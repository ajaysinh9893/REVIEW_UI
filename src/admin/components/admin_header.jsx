'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, User, LogOut, Clock } from 'lucide-react';

export default function AdminHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSessions, setShowSessions] = useState(false);

  const handleLogout = () => {
    // Temporary: Clear login flag from localStorage
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_email');
    window.location.href = '/admin/auth/login';
  };

  const sessions = [
    { id: 1, device: 'Chrome - Desktop', ip: '192.168.1.100', lastActive: 'Now', current: true },
    { id: 2, device: 'Safari - iPhone', ip: '192.168.1.101', lastActive: '2 hours ago', current: false },
    { id: 3, device: 'Firefox - Laptop', ip: '192.168.1.102', lastActive: '1 day ago', current: false },
  ];

  return (
    <header className="fixed top-0 right-0 left-72 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-20">
      {/* Left - Page Title */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Welcome to Admin</h2>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Sessions Button */}
        <div className="relative">
          <button
            onClick={() => setShowSessions(!showSessions)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Clock size={20} />
          </button>

          {/* Sessions Dropdown */}
          {showSessions && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Active Sessions</h3>
                <p className="text-xs text-gray-500">Manage your active sessions</p>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {sessions.map((session) => (
                  <div key={session.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{session.device}</p>
                        <p className="text-xs text-gray-500">{session.ip}</p>
                      </div>
                      {session.current && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">Last active: {session.lastActive}</p>
                      {!session.current && (
                        <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                          Logout
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3 pl-6 border-l border-gray-200 hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
            <span className="text-sm font-medium text-gray-900">Admin</span>
          </button>

          {/* User Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-900">admin@example.com</p>
                <p className="text-xs text-gray-500">Admin Account</p>
              </div>

              <Link
                href="/admin/settings"
                onClick={() => setShowMenu(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 transition-colors"
              >
                <User size={16} className="inline mr-2" />
                Account Settings
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} className="inline mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
