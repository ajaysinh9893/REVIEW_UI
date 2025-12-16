'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, User, FileText, TrendingUp, Clock } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 p-8 flex flex-col">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-white text-base font-bold">A</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">App Name</span>
      </div>

      <div className="mb-10 pb-6 border-b border-gray-100">
        <h3 className="text-base font-semibold text-gray-900">Jane Doe</h3>
        <p className="text-sm text-gray-500 mt-0.5">Admin</p>
      </div>

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
        <Link href="/profile">
          <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
            pathname === '/profile'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-700 hover:bg-gray-50'
          }`}>
            <User size={19} />
            <span>Profile</span>
          </button>
        </Link>
      </nav>
    </div>
  );
}
