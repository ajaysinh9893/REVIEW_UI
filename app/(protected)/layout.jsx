import Sidebar from '@/src/components/Sidebar';
import { Bell } from 'lucide-react';

export default function ProtectedLayout({ children }) {
  return (
    <div className="min-h-screen font-sans flex" style={{ backgroundColor: '#FAF9F5' }}>
      <Sidebar />
      <div className="ml-72 w-full flex flex-col relative">
        {/* Floating Notification Bell Icon - Fixed to viewport */}
        <div className="fixed top-8 z-50" style={{ right: '24px' }}>
          <button className="relative p-2.5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:scale-105 transition-all">
            <Bell size={24} className="text-indigo-600" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
