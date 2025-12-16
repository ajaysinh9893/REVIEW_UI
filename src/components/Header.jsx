'use client';

import Link from 'next/link';
import { Calendar, Search } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200 px-10 py-5 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Calendar size={20} className="text-gray-500" />
        <span className="text-base font-medium text-gray-700">December 4th, 2025</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all">
          <Search size={20} className="text-gray-600" />
        </button>
        <Link href="/profile">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full cursor-pointer hover:opacity-80 transition-opacity"></div>
        </Link>
      </div>
    </div>
  );
}
