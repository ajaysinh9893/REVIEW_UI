'use client';

export default function AdminCustomerRequestsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Customer Requests</h1>
      <p className="text-gray-600 mb-8">View and manage customer support requests</p>
      
      <div className="flex gap-4 mb-8">
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Filter by Status
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Sort
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Request ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Subject</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">REQ-{1000 + item}</td>
                <td className="px-6 py-4 text-sm text-gray-600">Customer {item}</td>
                <td className="px-6 py-4 text-sm text-gray-900">Support Request</td>
                <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span></td>
                <td className="px-6 py-4 text-sm text-gray-600">Jan {item}, 2024</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
