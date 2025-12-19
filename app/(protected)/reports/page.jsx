'use client';

import { useState } from 'react';
import { Search, Sparkles, Calendar, Filter, Download, RefreshCw, ChevronDown, X, Plus } from 'lucide-react';

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [savedQueries, setSavedQueries] = useState([
    'Call details every Monday',
    'Negative reviews from last week',
    'Direction requests on weekends',
    'All 5-star reviews this month'
  ]);

  const [activeFilters, setActiveFilters] = useState({
    dateRange: 'custom',
    dataType: 'all',
    frequency: 'once'
  });

  const dataTypeOptions = [
    { value: 'all', label: 'All Data' },
    { value: 'calls', label: 'Call Details' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'directions', label: 'Directions' },
    { value: 'impressions', label: 'Impressions' },
    { value: 'clicks', label: 'Clicks' }
  ];

  const frequencyOptions = [
    { value: 'once', label: 'One-time Report' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly (Every Monday)' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const handleSearch = async () => {
    setIsProcessing(true);
    // Simulate AI processing - Replace with actual Google API call
    setTimeout(() => {
      setReportData({
        query: searchQuery,
        results: [
          { date: 'Mon, Dec 2', calls: 28, duration: '2h 15m', source: 'Google Search' },
          { date: 'Mon, Dec 9', calls: 32, duration: '2h 45m', source: 'Google Maps' },
          { date: 'Mon, Dec 16', calls: 25, duration: '1h 58m', source: 'Google Search' }
        ],
        filters: activeFilters
      });
      setIsProcessing(false);
    }, 2000);
  };

  const handleQuickQuery = (query) => {
    setSearchQuery(query);
  };

  const handleSaveQuery = () => {
    if (searchQuery && !savedQueries.includes(searchQuery)) {
      setSavedQueries([searchQuery, ...savedQueries]);
      alert('Query saved successfully!');
    }
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
          {/* AI-Powered Search Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={24} className="text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">AI-Powered Report Builder</h2>
            </div>

            {/* Main Search Input */}
            <div className="relative mb-4">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ask anything... e.g., 'Show me call details every Monday' or 'Get all 5-star reviews from last week'"
                className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-all"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                <button
                  onClick={handleSearch}
                  disabled={!searchQuery || isProcessing}
                  className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Generate Report
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <Filter size={18} />
                  Advanced Filters
                  <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                {searchQuery && (
                  <button
                    onClick={handleSaveQuery}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <Plus size={18} />
                    Save Query
                  </button>
                )}
              </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Data Type</label>
                  <select
                    value={activeFilters.dataType}
                    onChange={(e) => setActiveFilters({...activeFilters, dataType: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {dataTypeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>
                  <input
                    type="date"
                    value={activeFilters.dateRange}
                    onChange={(e) => setActiveFilters({...activeFilters, dateRange: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Frequency</label>
                  <select
                    value={activeFilters.frequency}
                    onChange={(e) => setActiveFilters({...activeFilters, frequency: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {frequencyOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Saved Queries */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Saved Queries</h3>
              <div className="flex flex-wrap gap-2">
                {savedQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuery(query)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 transition-all"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Table */}
          {reportData && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Report Results</h3>
                  <p className="text-sm text-gray-500 mt-1">Query: "{reportData.query}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                    <Download size={18} />
                    Export CSV
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all">
                    <Calendar size={18} />
                    Schedule Report
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total Calls
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Source
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reportData.results.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {row.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.calls}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.source}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Total Calls</p>
                  <p className="text-2xl font-bold text-gray-900">85</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Avg. Duration</p>
                  <p className="text-2xl font-bold text-gray-900">2h 19m</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Peak Day</p>
                  <p className="text-2xl font-bold text-gray-900">Mon, Dec 9</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Growth</p>
                  <p className="text-2xl font-bold text-green-600">+12.5%</p>
                </div>
              </div>
            </div>
          )}
        </div>
  );
}
