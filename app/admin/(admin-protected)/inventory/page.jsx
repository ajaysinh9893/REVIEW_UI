'use client';

export default function AdminInventoryPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Inventory</h1>
      <p className="text-gray-600 mb-8">Track and manage platform inventory and resources</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {['Total Items', 'In Stock', 'Low Stock', 'Out of Stock'].map((label, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">{label}</p>
            <p className="text-3xl font-bold text-gray-900">{Math.floor(Math.random() * 1000)}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mb-8">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Item
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Filter
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Item Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">SKU</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Quantity</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">Item {item}</td>
                <td className="px-6 py-4 text-sm text-gray-600">SKU-{1000 + item}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{Math.floor(Math.random() * 100)}</td>
                <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">In Stock</span></td>
                <td className="px-6 py-4 text-sm text-blue-600 hover:text-blue-700 cursor-pointer">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
