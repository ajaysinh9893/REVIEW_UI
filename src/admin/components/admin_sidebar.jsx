'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Users, Settings, Home, Activity, Store, MessageSquare, Package, ScrollText, TrendingUp } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Dashboard', icon: Home, href: '/admin' },
    { label: 'Platform Insights', icon: TrendingUp, href: '/admin/platform-insights' },
    { label: 'System Health', icon: Activity, href: '/admin/system-health' },
    { label: 'Business Profiles', icon: Store, href: '/admin/business-profiles' },
    { label: 'Users', icon: Users, href: '/admin/users' },
    { label: 'Customer Requests', icon: MessageSquare, href: '/admin/customer-requests' },
    { label: 'Inventory', icon: Package, href: '/admin/inventory' },
    { label: 'System Logs', icon: ScrollText, href: '/admin/system-logs' },
    { label: 'Settings', icon: Settings, href: '/admin/admin-settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 w-72 h-screen bg-gray-900 text-white overflow-y-auto border-r border-gray-700">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-gray-400 text-sm mt-1">Management Dashboard</p>
      </div>

      {/* Menu */}
      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-800">
        <div className="text-sm text-gray-400">
          <p className="font-semibold text-white">Admin User</p>
          <p>admin@example.com</p>
        </div>
      </div>
    </aside>
  );
}
