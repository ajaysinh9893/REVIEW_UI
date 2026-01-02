'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Eye, Phone, Navigation, MousePointer, Calendar, MessageSquare, Search, MapPin, Download, Info } from 'lucide-react';
import KPIOverviewCard from '@/src/components/KPIOverviewCard';
import ActivityHeatmap from '@/src/components/ActivityHeatmap';
import { visibilityData as dashboardVisibilityData } from './dashboardData';

export default function VisibilityActivityPageRecharts() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('weekly');
  const [selectedMetric, setSelectedMetric] = useState(null); // null = all, 'calls', 'directions', 'clicks', 'impressions'

  // Generate comparison data with current and previous periods
  const getComparisonData = (timeframe, metric) => {
    const baseData = chartData[timeframe];
    
    // Generate variations for previous periods (with realistic decreases)
    return baseData.map((item) => {
      const current = item[metric];
      return {
        label: item.label,
        [`${metric}_current`]: current,
        [`${metric}_prev1`]: Math.round(current * 0.92),
        [`${metric}_prev2`]: Math.round(current * 0.85),
        [`${metric}_prev3`]: Math.round(current * 0.78),
      };
    });
  };

  // Get data for chart - either all metrics or comparison data for selected metric
  const getChartData = () => {
    if (selectedMetric) {
      return getComparisonData(selectedTimeframe, selectedMetric);
    }
    return chartData[selectedTimeframe];
  };

  const snapshotData = {
    impressions: { value: 12543, trend: 8.3, peakDay: 'Monday', lowDay: 'Sunday' },
    calls: { value: 234, trend: 12.5, peakDay: 'Tuesday', lowDay: 'Sunday' },
    directions: { value: 456, trend: -3.2, peakDay: 'Friday', lowDay: 'Monday' },
    websiteClicks: { value: 789, trend: 15.7, peakDay: 'Wednesday', lowDay: 'Saturday' },
    avgPerDay: { value: 1792, trend: 5.1 },
    bookings: { value: 67, trend: 22.4 },
    messages: { value: 143, trend: 9.8 }
  };

  const chartData = {
    daily: [
      { label: '12 AM', impressions: 450, calls: 5, directions: 8, clicks: 15 },
      { label: '3 AM', impressions: 320, calls: 2, directions: 4, clicks: 8 },
      { label: '6 AM', impressions: 680, calls: 12, directions: 18, clicks: 25 },
      { label: '9 AM', impressions: 1200, calls: 28, directions: 35, clicks: 48 },
      { label: '12 PM', impressions: 1850, calls: 42, directions: 55, clicks: 72 },
      { label: '3 PM', impressions: 2100, calls: 38, directions: 48, clicks: 65 },
      { label: '6 PM', impressions: 1650, calls: 32, directions: 42, clicks: 58 },
      { label: '9 PM', impressions: 980, calls: 18, directions: 28, clicks: 38 }
    ],
    weekly: [
      { label: 'Mon', impressions: 2100, calls: 42, directions: 78, clicks: 125 },
      { label: 'Tue', impressions: 1850, calls: 38, directions: 65, clicks: 110 },
      { label: 'Wed', impressions: 2300, calls: 45, directions: 82, clicks: 135 },
      { label: 'Thu', impressions: 1950, calls: 40, directions: 70, clicks: 115 },
      { label: 'Fri', impressions: 2200, calls: 44, directions: 88, clicks: 130 },
      { label: 'Sat', impressions: 1400, calls: 25, directions: 52, clicks: 75 },
      { label: 'Sun', impressions: 950, calls: 20, directions: 45, clicks: 65 }
    ],
    monthly: [
      { label: 'Week 1', impressions: 8500, calls: 165, directions: 310, clicks: 485 },
      { label: 'Week 2', impressions: 9200, calls: 178, directions: 345, clicks: 520 },
      { label: 'Week 3', impressions: 8800, calls: 172, directions: 325, clicks: 495 },
      { label: 'Week 4', impressions: 9500, calls: 185, directions: 360, clicks: 545 }
    ],
    yearly: [
      { label: 'Jan', impressions: 35000, calls: 680, directions: 1250, clicks: 1950 },
      { label: 'Feb', impressions: 32000, calls: 620, directions: 1180, clicks: 1820 },
      { label: 'Mar', impressions: 38000, calls: 740, directions: 1380, clicks: 2150 },
      { label: 'Apr', impressions: 36500, calls: 710, directions: 1320, clicks: 2050 },
      { label: 'May', impressions: 39500, calls: 770, directions: 1420, clicks: 2220 },
      { label: 'Jun', impressions: 41000, calls: 800, directions: 1480, clicks: 2310 },
      { label: 'Jul', impressions: 37500, calls: 730, directions: 1350, clicks: 2100 },
      { label: 'Aug', impressions: 38500, calls: 750, directions: 1390, clicks: 2170 },
      { label: 'Sep', impressions: 40000, calls: 780, directions: 1440, clicks: 2250 },
      { label: 'Oct', impressions: 42000, calls: 820, directions: 1520, clicks: 2370 },
      { label: 'Nov', impressions: 39000, calls: 760, directions: 1410, clicks: 2200 },
      { label: 'Dec', impressions: 36000, calls: 700, directions: 1300, clicks: 2030 }
    ]
  };

  const miniChartData = chartData[selectedTimeframe];

  const searchQueries = [
    'reviews management', 'business dashboard', 'customer feedback',
    'analytics tool', 'review monitoring', 'reputation management',
    'local business', 'customer insights'
  ];

  const topLocations = [
    { city: 'New York, NY', count: 234 },
    { city: 'Los Angeles, CA', count: 189 },
    { city: 'Chicago, IL', count: 156 },
    { city: 'Houston, TX', count: 143 },
    { city: 'Phoenix, AZ', count: 128 }
  ];

  const SnapshotTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg">
          <p className="font-semibold mb-1">{payload[0].payload.label}</p>
          <p>{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg">
          <p className="font-semibold mb-1">{label}</p>
          <p>{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="p-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Visibility & Activity
            </h1>
            <p className="text-gray-600">
              Track how customers find and interact with your business
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md">
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>

        {/* KPI Overview Card from Dashboard */}
        <div className="rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
          <div className="mb-8">
            <KPIOverviewCard 
              visibilityData={dashboardVisibilityData} 
              period="daily" 
              selectedTimeframe={selectedTimeframe}
              onTimeframeChange={setSelectedTimeframe}
              onCardClick={setSelectedMetric}
              selectedMetric={selectedMetric}
              showTimeframeButtons={true}
            />
          </div>

          {/* Multi-Line Chart - Activity Trends */}          <h3 className="text-lg font-bold text-gray-900 mb-6\">Activity Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData()} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="label" 
                  stroke="#9ca3af" 
                  style={{ fontSize: '14px', fontWeight: 500 }}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#1f2937',
                    padding: '8px 12px'
                  }}
                  formatter={(value) => value.toLocaleString()}
                  cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                />
                
                {!selectedMetric ? (
                  <>
                    {/* Show all metrics when no metric is selected - excluding impressions */}
                    {
                      <Line 
                        type="monotone" 
                        dataKey="calls" 
                        stroke="#d97706" 
                        strokeWidth={3}
                        dot={{ fill: '#fff', stroke: '#d97706', strokeWidth: 1, r: 4 }}
                        activeDot={{ r: 5 }}
                        name="Calls"
                      />
                    }
                    {
                      <Line 
                        type="monotone" 
                        dataKey="directions" 
                        stroke="#16a34a" 
                        strokeWidth={3}
                        dot={{ fill: '#fff', stroke: '#16a34a', strokeWidth: 1, r: 4 }}
                        activeDot={{ r: 5 }}
                        name="Directions"
                      />
                    }
                    {
                      <Line 
                        type="monotone" 
                        dataKey="clicks" 
                        stroke="#dc2626" 
                        strokeWidth={3}
                        dot={{ fill: '#fff', stroke: '#dc2626', strokeWidth: 1, r: 4 }}
                        activeDot={{ r: 5 }}
                        name="Clicks"
                      />
                    }
                  </>
                ) : (
                  <>
                    {/* Show comparison lines when a metric is selected */}
                    {/* Current period - darkest and thickest */}
                    <Line 
                      type="monotone" 
                      dataKey={`${selectedMetric}_current`} 
                      stroke={selectedMetric === 'calls' ? '#d97706' : selectedMetric === 'directions' ? '#16a34a' : selectedMetric === 'clicks' ? '#dc2626' : '#2563eb'} 
                      strokeWidth={3}
                      dot={{ fill: '#fff', stroke: selectedMetric === 'calls' ? '#d97706' : selectedMetric === 'directions' ? '#16a34a' : selectedMetric === 'clicks' ? '#dc2626' : '#2563eb', strokeWidth: 1, r: 4 }}
                      activeDot={{ r: 5 }}
                      name={`${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} - Current`}
                    />
                    {/* Previous period 1 - medium grey */}
                    <Line 
                      type="monotone" 
                      dataKey={`${selectedMetric}_prev1`} 
                      stroke="#cbd5e1"
                      strokeWidth={3}
                      dot={{ fill: '#fff', stroke: '#cbd5e1', strokeWidth: 1, r: 4 }}
                      activeDot={{ r: 5 }}
                      name={`${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} - Last Period`}
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200 flex-wrap">
            {!selectedMetric ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#d97706' }}></div>
                  <span className="text-sm font-medium text-gray-700">Calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#16a34a' }}></div>
                  <span className="text-sm font-medium text-gray-700">Directions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#dc2626' }}></div>
                  <span className="text-sm font-medium text-gray-700">Clicks</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedMetric === 'calls' ? '#d97706' : selectedMetric === 'directions' ? '#16a34a' : selectedMetric === 'clicks' ? '#dc2626' : '#2563eb' }}></div>
                  <span className="text-sm font-medium text-gray-700">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Last Period</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Section Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-6 py-2 bg-gray-50 text-lg font-bold text-gray-900">
              Activity Details
            </span>
          </div>
        </div>

        {/* Activity Details Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          
          {/* Search Queries Panel */}
          <div className="rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-2 mb-5">
              <Search className="text-indigo-600" size={20} />
              <h3 className="text-lg font-bold text-gray-900">Top Search Queries</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-4 overflow-y-auto pr-2">
              {searchQueries.map((query, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full hover:bg-indigo-100 transition-all cursor-pointer whitespace-nowrap"
                >
                  {query}
                </span>
              ))}
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mt-auto">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> These are the most common search terms customers use to find your business online.
              </p>
            </div>
          </div>

          {/* Top Locations */}
          <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="text-red-600" size={20} />
              <h3 className="text-lg font-bold text-gray-900">Top Locations</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={topLocations}
                  layout="vertical"
                  margin={{ top: 5, right: 20, bottom: 5, left: 80 }}
                >
                  <XAxis type="number" stroke="#9ca3af" />
                  <YAxis 
                    type="category" 
                    dataKey="city" 
                    stroke="#9ca3af"
                    width={75}
                    style={{ fontSize: '11px' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#fff',
                      padding: '8px 12px'
                    }}
                  />
                  <Bar dataKey="count" fill="#6366f1" radius={[0, 8, 8, 0]}>
                    {topLocations.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'][index]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          <ActivityHeatmap />
        </div>

        {/* Bookings and Messages Row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Bookings Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="text-indigo-600" size={20} />
              <h3 className="text-lg font-bold text-gray-900">Bookings</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">
              {snapshotData.bookings.value}
            </p>
            <div className="flex items-center gap-1">
              <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                <TrendingUp size={14} />
                {snapshotData.bookings.trend}%
              </span>
              <span className="text-sm text-gray-500">vs last period</span>
            </div>
          </div>

          {/* Messages Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="text-blue-600" size={20} />
              <h3 className="text-lg font-bold text-gray-900">Messages</h3>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">
              {snapshotData.messages.value}
            </p>
            <div className="flex items-center gap-1">
              <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                <TrendingUp size={14} />
                {snapshotData.messages.trend}%
              </span>
              <span className="text-sm text-gray-500">vs last period</span>
            </div>
          </div>
        </div>

        {/* Heatmap Section */}
        <div className="rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <MapPin className="text-indigo-600" size={20} />
              <h3 className="text-lg font-bold text-gray-900">Interaction Heatmap</h3>
            </div>
            <button className="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
              View Full Map
            </button>
          </div>
          
          <div className="relative h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden border border-indigo-200">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(79, 70, 229, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 70, 229, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
            
            <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-red-500 rounded-full opacity-30 blur-xl"></div>
            <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-orange-500 rounded-full opacity-25 blur-xl"></div>
            <div className="absolute bottom-1/3 left-1/2 w-16 h-16 bg-yellow-500 rounded-full opacity-20 blur-xl"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-indigo-600 mx-auto mb-3 opacity-50" />
                <p className="text-gray-600 font-medium">Geographic interaction data visualization</p>
                <p className="text-sm text-gray-500 mt-2">Heat zones show customer density by location</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Info className="text-indigo-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Understanding Your Metrics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Impressions:</strong> Number of times your business appeared in search results or maps
                </div>
                <div>
                  <strong>Calls:</strong> Total phone calls initiated from your business listing
                </div>
                <div>
                  <strong>Directions:</strong> Number of times users requested directions to your location
                </div>
                <div>
                  <strong>Website Clicks:</strong> Clicks on your website link from your business profile
                </div>
                <div>
                  <strong>Bookings:</strong> Appointments or reservations made through your listing
                </div>
                <div>
                  <strong>Messages:</strong> Direct messages sent to your business
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
