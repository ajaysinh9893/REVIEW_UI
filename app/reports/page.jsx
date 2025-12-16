'use client';

import Sidebar from '@/src/components/Sidebar';
import Header from '@/src/components/Header';

export default function ReportsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-72 w-full">
        <Header />
        <div className="p-10">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          {/* Content will be added here */}
        </div>
      </div>
    </div>
  );
}
