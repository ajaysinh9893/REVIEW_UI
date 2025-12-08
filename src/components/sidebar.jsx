'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Star, Lock } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/review-dashboard', icon: <Star size={19} /> },
    { name: 'Profile', href: '/review-profile', icon: <User size={19} /> },
    { name: 'Logout', href: '/login', icon: <Lock size={19} /> },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-8 min-h-screen">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-white text-base font-bold">K</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">Kinety</span>
      </div>

      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}