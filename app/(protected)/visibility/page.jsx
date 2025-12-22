'use client';

import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function VisibilityPage() {
  const [scrollY, setScrollY] = useState(0);
  const fadeDistance = 80; // Smaller fade distance
  const fadeOpacity = Math.max(0, 1 - scrollY / fadeDistance);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [visibilityPeriod, setVisibilityPeriod] = useState('weekly');

  // Daily data for the past week
  const dailyVisibilityData = [
    { name: 'Mon', impressions: 1250, clicks: 85, calls: 12, directions: 28 },
    { name: 'Tue', impressions: 1380, clicks: 92, calls: 15, directions: 32 },
    { name: 'Wed', impressions: 1420, clicks: 88, calls: 11, directions: 25 },
    { name: 'Thu', impressions: 1560, clicks: 105, calls: 18, directions: 38 },
    { name: 'Fri', impressions: 1890, clicks: 128, calls: 22, directions: 45 },
    { name: 'Sat', impressions: 2100, clicks: 145, calls: 28, directions: 52 },
    { name: 'Sun', impressions: 1750, clicks: 112, calls: 19, directions: 41 }
  ];

  // Weekly data for the past month
  const weeklyVisibilityData = [
    { name: 'Week 1', impressions: 8500, clicks: 580, calls: 85, directions: 195 },
    { name: 'Week 2', impressions: 9200, clicks: 645, calls: 92, directions: 218 },
    { name: 'Week 3', impressions: 8800, clicks: 612, calls: 88, directions: 205 },
    { name: 'Week 4', impressions: 10500, clicks: 735, calls: 108, directions: 262 }
  ];

  // Monthly data for the past 6 months
  const monthlyVisibilityData = [
    { name: 'Jul', impressions: 32000, clicks: 2240, calls: 320, directions: 780 },
    { name: 'Aug', impressions: 35500, clicks: 2485, calls: 355, directions: 865 },
    { name: 'Sep', impressions: 38200, clicks: 2674, calls: 382, directions: 930 },
    { name: 'Oct', impressions: 36800, clicks: 2576, calls: 368, directions: 895 },
    { name: 'Nov', impressions: 41000, clicks: 2870, calls: 410, directions: 998 },
    { name: 'Dec', impressions: 45200, clicks: 3164, calls: 452, directions: 1100 }
  ];

  // Select visibility data based on period
  const visibilityData = visibilityPeriod === 'daily' 
    ? dailyVisibilityData 
    : visibilityPeriod === 'weekly' 
      ? weeklyVisibilityData 
      : monthlyVisibilityData;

  // Calculate visibility metrics and trend changes
  const calculateVisibilityMetrics = () => {
    const data = visibilityData;
    const currentPeriod = data[data.length - 1];
    const previousPeriod = data[data.length - 2];

    const totalImpressions = data.reduce((sum, d) => sum + d.impressions, 0);
    const totalClicks = data.reduce((sum, d) => sum + d.clicks, 0);
    const totalCalls = data.reduce((sum, d) => sum + d.calls, 0);
    const totalDirections = data.reduce((sum, d) => sum + d.directions, 0);

    const calcChange = (current, previous) => {
      if (previous === 0) return 0;
      return ((current - previous) / previous * 100).toFixed(1);
    };

    const impressionsChange = calcChange(currentPeriod.impressions, previousPeriod.impressions);
    const clicksChange = calcChange(currentPeriod.clicks, previousPeriod.clicks);
    const callsChange = calcChange(currentPeriod.calls, previousPeriod.calls);
    const directionsChange = calcChange(currentPeriod.directions, previousPeriod.directions);

    const detectTrend = (change) => {
      const val = parseFloat(change);
      if (val >= 20) return 'spike';
      if (val <= -20) return 'drop';
      return 'stable';
    };

    return {
      totals: { totalImpressions, totalClicks, totalCalls, totalDirections },
      changes: { impressionsChange, clicksChange, callsChange, directionsChange },
      trends: {
        impressions: detectTrend(impressionsChange),
        clicks: detectTrend(clicksChange),
        calls: detectTrend(callsChange),
        directions: detectTrend(directionsChange)
      }
    };
  };

  const visibilityMetrics = calculateVisibilityMetrics();

  return (
    <div className="min-h-screen">
      <div className="p-10 pr-24">
        <div className="max-w-7xl mx-auto">
            {/* Visibility Trends Line Chart */}
            <div className="rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Visibility Trends</h2>
                </div>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setVisibilityPeriod('daily')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      visibilityPeriod === 'daily'
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    Daily
                  </button>
                  <button
                    onClick={() => setVisibilityPeriod('weekly')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      visibilityPeriod === 'weekly'
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setVisibilityPeriod('monthly')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      visibilityPeriod === 'monthly'
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Visibility Metrics Summary Cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {/* Impressions Card */}
                <div className="bg-blue-100 rounded-lg p-4">
                  <p className="text-xs font-medium text-blue-700 uppercase tracking-wide mb-1">Impressions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {visibilityMetrics.totals.totalImpressions.toString()}
                  </p>
                  <div className={`flex items-center gap-1 mt-1 text-sm font-medium ${
                    parseFloat(visibilityMetrics.changes.impressionsChange) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp size={14} className={parseFloat(visibilityMetrics.changes.impressionsChange) < 0 ? 'rotate-180' : ''} />
                    <span>{visibilityMetrics.changes.impressionsChange}%</span>
                    {visibilityMetrics.trends.impressions === 'spike' && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded">Spike</span>
                    )}
                    {visibilityMetrics.trends.impressions === 'drop' && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-100 text-red-700 rounded">Drop</span>
                    )}
                  </div>
                </div>

                {/* Clicks Card */}
                <div className="bg-red-100 rounded-lg p-4">
                  <p className="text-xs font-medium text-red-700 uppercase tracking-wide mb-1">Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {visibilityMetrics.totals.totalClicks.toString()}
                  </p>
                  <div className={`flex items-center gap-1 mt-1 text-sm font-medium ${
                    parseFloat(visibilityMetrics.changes.clicksChange) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp size={14} className={parseFloat(visibilityMetrics.changes.clicksChange) < 0 ? 'rotate-180' : ''} />
                    <span>{visibilityMetrics.changes.clicksChange}%</span>
                    {visibilityMetrics.trends.clicks === 'spike' && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded">Spike</span>
                    )}
                    {visibilityMetrics.trends.clicks === 'drop' && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-100 text-red-700 rounded">Drop</span>
                    )}
                  </div>
                </div>

                {/* Calls Card */}
                <div className="bg-yellow-100 rounded-lg p-4">
                  <p className="text-xs font-medium text-yellow-700 uppercase tracking-wide mb-1">Calls</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {visibilityMetrics.totals.totalCalls.toString()}
                  </p>
                  <div className={`flex items-center gap-1 mt-1 text-sm font-medium ${
                    parseFloat(visibilityMetrics.changes.callsChange) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp size={14} className={parseFloat(visibilityMetrics.changes.callsChange) < 0 ? 'rotate-180' : ''} />
                    <span>{visibilityMetrics.changes.callsChange}%</span>
                    {visibilityMetrics.trends.calls === 'spike' && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded">Spike</span>
                    )}
                    {visibilityMetrics.trends.calls === 'drop' && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-100 text-red-700 rounded">Drop</span>
                    )}
                  </div>
                </div>

                {/* Direction Requests Card */}
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="text-xs font-medium text-green-700 uppercase tracking-wide mb-1">Directions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {visibilityMetrics.totals.totalDirections.toString()}
                  </p>
                  <div className={`flex items-center gap-1 mt-1 text-sm font-medium ${
                    parseFloat(visibilityMetrics.changes.directionsChange) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp size={14} className={parseFloat(visibilityMetrics.changes.directionsChange) < 0 ? 'rotate-180' : ''} />
                    <span>{visibilityMetrics.changes.directionsChange}%</span>
                    {visibilityMetrics.trends.directions === 'spike' && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded">Spike</span>
                    )}
                    {visibilityMetrics.trends.directions === 'drop' && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-100 text-red-700 rounded">Drop</span>
                    )}
                  </div>
                </div>
              </div>
              {/* Visibility Trends Line Chart */}
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={visibilityData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px', fontWeight: '500' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px', fontWeight: '500' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '12px'
                    }}
                    cursor={{ stroke: '#d1d5db', strokeWidth: 1 }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
                  />
                  <Line
                    type="monotone"
                    dataKey="impressions"
                    stroke="#2563eb"
                    strokeWidth={2}
                    name="Impressions"
                    dot={{ fill: '#2563eb', r: 4 }}
                    activeDot={{ r: 6, fill: '#2563eb' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#dc2626"
                    strokeWidth={2}
                    name="Clicks"
                    dot={{ fill: '#dc2626', r: 4 }}
                    activeDot={{ r: 6, fill: '#dc2626' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="calls"
                    stroke="#d97706"
                    strokeWidth={2}
                    name="Calls"
                    dot={{ fill: '#d97706', r: 4 }}
                    activeDot={{ r: 6, fill: '#d97706' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="directions"
                    stroke="#16a34a"
                    strokeWidth={2}
                    name="Directions"
                    dot={{ fill: '#16a34a', r: 4 }}
                    activeDot={{ r: 6, fill: '#16a34a' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* ============ VISIBILITY TRENDS UI SECTION END ============ */}
        </div>
      </div>
    </div>
  );
}
