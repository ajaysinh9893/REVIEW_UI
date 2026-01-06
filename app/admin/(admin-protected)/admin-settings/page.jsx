'use client';

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-600 mb-8">Configure platform settings and preferences</p>
      
      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
              <input type="text" placeholder="Enter platform name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform URL</label>
              <input type="text" placeholder="https://example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
              <input type="text" placeholder="smtp.example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
              <input type="email" placeholder="admin@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input type="checkbox" id="twofa" className="w-4 h-4" defaultChecked />
              <label htmlFor="twofa" className="text-sm text-gray-700">Enable Two-Factor Authentication</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="ssl" className="w-4 h-4" defaultChecked />
              <label htmlFor="ssl" className="text-sm text-gray-700">Enforce SSL/TLS</label>
            </div>
          </div>
        </div>

        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
