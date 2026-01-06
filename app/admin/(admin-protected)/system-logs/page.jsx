'use client';

export default function AdminSystemLogsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">System Logs</h1>
      <p className="text-gray-600 mb-8">View system activities and error logs</p>
      
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Search logs..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Filter by Type
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Timestamp</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Level</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Message</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">2024-01-0{item} 10:{item}0:00</td>
                <td className="px-6 py-4 text-sm"><span className={`px-2 py-1 rounded-full text-xs ${
                  item % 3 === 0 ? 'bg-red-100 text-red-800' :
                  item % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>{
                  item % 3 === 0 ? 'ERROR' :
                  item % 3 === 1 ? 'WARNING' :
                  'INFO'
                }</span></td>
                <td className="px-6 py-4 text-sm text-gray-900">System log message {item}</td>
                <td className="px-6 py-4 text-sm text-gray-600">API</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
