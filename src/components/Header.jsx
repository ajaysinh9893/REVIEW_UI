'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, Settings, LogOut, User } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      // Clear any auth data (cookies, localStorage, etc.)
      router.push('/login');
    }
  };

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    setCurrentDate(formatted);
  }, []);

  return (
    <div className="bg-white border-b border-gray-200 px-10 py-1 flex justify-between items-center sticky top-0 z-40 shadow-sm">
      <div className="flex-1"></div>
      
      <div className="flex items-center gap-6">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all hover:text-gray-900">
          <Bell size={20} />
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Jane Doe</span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <Link href="/profile">
                <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all border-b border-gray-100">
                  <User size={16} />
                  My Profile
                </button>
              </Link>
              <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all border-b border-gray-100">
                <Settings size={16} />
                Settings
              </button>
              <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
