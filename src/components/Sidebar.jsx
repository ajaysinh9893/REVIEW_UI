'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, User, FileText, TrendingUp, Clock, HelpCircle, Users, Settings, LogOut, Lock, CreditCard, AlertCircle } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    // Clear any auth data (cookies, localStorage, etc.)
    await router.push('/login');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 p-[12px] pb-[30px] flex flex-col">
      <div className="flex items-center gap-3 mb-3 pl-5 pt-0.5">
        <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
          <span className="text-white text-base font-bold">A</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">App Name</span>
      </div>

      <div className="border-t border-gray-200 mb-4"></div>

      <nav className="space-y-1.5">
        <Link href="/dashboard">
          <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            pathname === '/dashboard'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50'
          }`}>
            <BarChart3 size={19} />
            <span>Dashboard</span>
          </button>
        </Link>
        <Link href="/reviews">
          <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            pathname === '/reviews'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50'
          }`}>
            <FileText size={19} />
            <span>Reviews</span>
          </button>
        </Link>
        <Link href="/visibility">
          <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            pathname === '/visibility'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50'
          }`}>
            <TrendingUp size={19} />
            <span>Visibility</span>
          </button>
        </Link>
        <Link href="/activity">
          <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            pathname === '/activity'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50'
          }`}>
            <Clock size={19} />
            <span>Activity / Busy Times</span>
          </button>
        </Link>
        <Link href="/reports">
          <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            pathname === '/reports'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50'
          }`}>
            <BarChart3 size={19} />
            <span>Reports</span>
          </button>
        </Link>
        <Link href="/directory">
          <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            pathname === '/directory'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50'
          }`}>
            <Users size={19} />
            <span>Directory</span>
          </button>
        </Link>
        <Link href="/faq">
          <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            pathname === '/faq'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50'
          }`}>
            <HelpCircle size={19} />
            <span>FAQ</span>
          </button>
        </Link>
      </nav>

      <div className="border-t border-gray-200 mt-auto pt-4 mb-4"></div>

      <nav className="space-y-1.5">
        <Link href="/subscription">
          <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            pathname === '/subscription'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50'
          }`}>
            <CreditCard size={19} />
            <span>Subscription</span>
          </button>
        </Link>
        <Link href="/settings">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all text-gray-700 hover:bg-gray-50">
            <Settings size={19} />
            <span>Settings</span>
          </button>
        </Link>
        <div className="border-t border-gray-200 my-2"></div>
        <button onClick={handleLogoutClick} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all text-red-600 hover:bg-red-50">
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={handleCancelLogout}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4 animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Logout?</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You&apos;ll need to sign in again to access your account.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancelLogout}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
