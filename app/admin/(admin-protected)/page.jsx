'use client';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      {/* Placeholder - will add KPI cards and charts here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        ))}
      </div>

      <p className="text-gray-600 mt-8">
        Ready for admin features. Waiting for page requirements...
      </p>
    </div>
  );
}
