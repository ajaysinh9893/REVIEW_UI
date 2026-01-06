'use client';

export default function AdminPlatformInsightsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Platform Insights</h1>
      <p className="text-gray-600 mb-8">Analytics and performance metrics of the platform</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {['Total Users', 'Active Sessions', 'Revenue', 'Growth Rate'].map((label, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">{label}</p>
            <p className="text-3xl font-bold text-gray-900">{Math.floor(Math.random() * 10000)}</p>
            <p className="text-xs text-green-600 mt-2">↑ {Math.floor(Math.random() * 50)}%</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User Growth</h2>
          <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Trend</h2>
          <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Performing Regions</h2>
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}
