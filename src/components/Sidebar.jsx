'use client';

import Link from 'next/link';
import { BarChart3, User, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-72 bg-white border-r border-gray-200 p-8">
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
        <Link href="/">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
            <BarChart3 size={19} />
            <span>Dashboard</span>
          </button>
        </Link>
        <Link href="/review-profile">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-lg shadow-sm">
            <User size={19} />
            <span>Profile</span>
          </button>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
          <BarChart3 size={19} />
          <span>Reports</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
          <Settings size={19} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}
