'use client';

export default function AdminSystemHealthPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">System Health</h1>
      <p className="text-gray-600 mb-8">Monitor and manage system performance and status</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Metrics</h2>
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}
