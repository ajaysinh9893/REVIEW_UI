'use client';

import { useState } from 'react';
import { Phone, Navigation, MousePointer, Eye, Calendar } from 'lucide-react';

export default function ActivityHeatmap() {
  const [selectedMetric, setSelectedMetric] = useState('all'); // 'all', 'calls', 'directions', 'clicks', 'views'

  // Days of the week
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Hours of the day (24-hour format)
  const hours = [
    '12am', '1am', '2am', '3am', '4am', '5am',
    '6am', '7am', '8am', '9am', '10am', '11am',
    '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',
    '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'
  ];

  // Static heatmap data (activity intensity 0-100 for each day/hour)
  const weeklyHeatmapData = {
    all: {
      'Mon': [5, 3, 2, 1, 2, 8, 25, 45, 78, 85, 82, 75, 70, 68, 72, 80, 88, 92, 85, 70, 45, 30, 15, 8],
      'Tue': [4, 2, 1, 1, 3, 10, 28, 48, 80, 88, 85, 78, 72, 70, 75, 82, 90, 95, 88, 72, 48, 32, 18, 10],
      'Wed': [6, 3, 2, 2, 4, 12, 30, 50, 82, 90, 88, 80, 75, 72, 78, 85, 92, 98, 90, 75, 50, 35, 20, 12],
      'Thu': [5, 3, 1, 1, 3, 10, 28, 48, 80, 88, 85, 78, 72, 70, 75, 82, 90, 95, 88, 72, 48, 32, 18, 10],
      'Fri': [7, 4, 2, 2, 5, 15, 35, 55, 85, 92, 90, 85, 80, 78, 82, 88, 95, 100, 95, 80, 60, 40, 25, 15],
      'Sat': [8, 5, 3, 2, 3, 8, 20, 40, 65, 75, 78, 80, 82, 85, 88, 90, 85, 80, 70, 55, 40, 28, 18, 12],
      'Sun': [6, 4, 2, 1, 2, 5, 15, 30, 50, 60, 65, 70, 72, 75, 78, 75, 70, 65, 55, 40, 25, 18, 12, 8]
    },
    calls: {
      'Mon': [2, 1, 0, 0, 1, 3, 15, 35, 68, 75, 72, 65, 60, 58, 62, 70, 78, 82, 75, 60, 35, 20, 8, 3],
      'Tue': [2, 1, 0, 0, 1, 5, 18, 38, 70, 78, 75, 68, 62, 60, 65, 72, 80, 85, 78, 62, 38, 22, 10, 5],
      'Wed': [3, 1, 0, 0, 2, 6, 20, 40, 72, 80, 78, 70, 65, 62, 68, 75, 82, 88, 80, 65, 40, 25, 12, 6],
      'Thu': [2, 1, 0, 0, 1, 5, 18, 38, 70, 78, 75, 68, 62, 60, 65, 72, 80, 85, 78, 62, 38, 22, 10, 5],
      'Fri': [3, 2, 0, 0, 2, 8, 25, 45, 75, 82, 80, 75, 70, 68, 72, 78, 85, 90, 85, 70, 50, 30, 15, 8],
      'Sat': [4, 2, 1, 0, 1, 3, 12, 30, 55, 65, 68, 70, 72, 75, 78, 80, 75, 70, 60, 45, 30, 18, 10, 6],
      'Sun': [3, 2, 0, 0, 1, 2, 8, 20, 40, 50, 55, 60, 62, 65, 68, 65, 60, 55, 45, 30, 15, 10, 6, 4]
    },
    directions: {
      'Mon': [1, 0, 0, 0, 0, 2, 8, 20, 45, 52, 50, 45, 42, 40, 44, 50, 56, 60, 52, 42, 25, 15, 5, 2],
      'Tue': [1, 0, 0, 0, 1, 3, 10, 22, 48, 55, 52, 48, 44, 42, 46, 52, 58, 62, 55, 44, 28, 16, 8, 3],
      'Wed': [2, 1, 0, 0, 1, 4, 12, 25, 50, 58, 55, 50, 46, 44, 48, 52, 60, 65, 58, 46, 30, 18, 10, 4],
      'Thu': [1, 0, 0, 0, 1, 3, 10, 22, 48, 55, 52, 48, 44, 42, 46, 52, 58, 62, 55, 44, 28, 16, 8, 3],
      'Fri': [2, 1, 0, 0, 2, 5, 15, 28, 52, 60, 58, 52, 48, 46, 50, 56, 62, 68, 62, 50, 35, 22, 12, 5],
      'Sat': [3, 2, 1, 0, 1, 2, 10, 22, 40, 48, 50, 52, 54, 56, 58, 58, 55, 52, 45, 35, 25, 15, 10, 5],
      'Sun': [2, 1, 0, 0, 0, 1, 6, 15, 30, 38, 40, 42, 44, 46, 48, 46, 42, 38, 32, 22, 12, 8, 5, 3]
    },
    clicks: {
      'Mon': [3, 2, 1, 1, 1, 5, 15, 28, 50, 58, 55, 50, 45, 42, 46, 52, 58, 62, 58, 45, 28, 18, 10, 5],
      'Tue': [2, 1, 1, 1, 2, 6, 18, 30, 52, 60, 58, 52, 48, 45, 48, 55, 60, 65, 60, 48, 30, 20, 12, 6],
      'Wed': [4, 2, 1, 1, 2, 7, 20, 32, 55, 62, 60, 55, 50, 48, 52, 58, 62, 68, 62, 50, 32, 22, 13, 7],
      'Thu': [3, 2, 1, 1, 2, 6, 18, 30, 52, 60, 58, 52, 48, 45, 48, 55, 60, 65, 60, 48, 30, 20, 12, 6],
      'Fri': [4, 3, 1, 1, 3, 8, 22, 35, 58, 65, 62, 58, 52, 50, 55, 60, 65, 70, 65, 55, 38, 25, 15, 8],
      'Sat': [5, 3, 2, 1, 2, 5, 12, 25, 42, 50, 52, 55, 58, 60, 62, 62, 58, 55, 48, 38, 28, 18, 12, 7],
      'Sun': [4, 2, 1, 1, 1, 3, 10, 20, 35, 42, 45, 48, 50, 52, 55, 52, 48, 42, 38, 28, 18, 12, 8, 5]
    },
    views: {
      'Mon': [8, 5, 3, 2, 3, 12, 35, 58, 88, 95, 92, 85, 80, 78, 82, 90, 98, 100, 95, 80, 55, 38, 22, 12],
      'Tue': [7, 4, 2, 2, 4, 15, 38, 60, 90, 98, 95, 88, 82, 80, 85, 92, 100, 98, 98, 82, 58, 40, 25, 15],
      'Wed': [9, 5, 3, 3, 5, 18, 40, 65, 92, 100, 98, 90, 85, 82, 88, 95, 98, 100, 98, 85, 60, 42, 28, 18],
      'Thu': [8, 5, 2, 2, 4, 15, 38, 60, 90, 98, 95, 88, 82, 80, 85, 92, 100, 98, 98, 82, 58, 40, 25, 15],
      'Fri': [10, 6, 3, 3, 6, 20, 45, 68, 95, 100, 100, 95, 90, 88, 92, 98, 100, 100, 100, 90, 70, 48, 32, 20],
      'Sat': [12, 8, 5, 3, 4, 12, 28, 52, 78, 88, 90, 92, 95, 98, 100, 100, 95, 90, 82, 68, 52, 38, 25, 18],
      'Sun': [10, 6, 3, 2, 3, 8, 22, 42, 65, 75, 78, 82, 85, 88, 90, 88, 82, 75, 68, 52, 35, 25, 18, 12]
    }
  };

  const currentData = weeklyHeatmapData[selectedMetric];

  // Get color based on intensity (0-100)
  // Blue (less) → Green (mid) → Yellow (higher mid) → Red (high)
  const getColor = (intensity) => {
    if (intensity === 0) return 'bg-gray-100';
    // Blue: 1-20 (light to dark)
    if (intensity < 5) return 'bg-blue-100';
    if (intensity < 10) return 'bg-blue-200';
    if (intensity < 15) return 'bg-blue-300';
    if (intensity < 20) return 'bg-blue-400';
    // Green: 20-40 (light to dark)
    if (intensity < 25) return 'bg-green-200';
    if (intensity < 30) return 'bg-green-300';
    if (intensity < 35) return 'bg-green-400';
    if (intensity < 40) return 'bg-green-500';
    // Yellow: 40-70 (light to dark)
    if (intensity < 45) return 'bg-yellow-200';
    if (intensity < 50) return 'bg-yellow-300';
    if (intensity < 55) return 'bg-yellow-400';
    if (intensity < 60) return 'bg-yellow-500';
    if (intensity < 65) return 'bg-yellow-600';
    if (intensity < 70) return 'bg-amber-600';
    // Red: 70-100 (light to dark)
    if (intensity < 75) return 'bg-red-300';
    if (intensity < 80) return 'bg-red-400';
    if (intensity < 85) return 'bg-red-500';
    if (intensity < 90) return 'bg-red-600';
    if (intensity < 95) return 'bg-red-700';
    return 'bg-red-800';
  };

  return (
    <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Weekly Activity Heatmap</h3>
          <p className="text-sm text-gray-600 mt-1">Darker colors indicate higher activity</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <button
            onClick={() => setSelectedMetric('all')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedMetric === 'all'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Eye size={14} />
            All
          </button>
          <button
            onClick={() => setSelectedMetric('calls')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedMetric === 'calls'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Phone size={14} />
            Calls
          </button>
          <button
            onClick={() => setSelectedMetric('directions')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedMetric === 'directions'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Navigation size={14} />
            Directions
          </button>
          <button
            onClick={() => setSelectedMetric('clicks')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedMetric === 'clicks'
                ? 'bg-orange-100 text-orange-700'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MousePointer size={14} />
            Clicks
          </button>
          <button
            onClick={() => setSelectedMetric('views')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedMetric === 'views'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Calendar size={14} />
            Views
          </button>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="flex flex-col gap-px">
        {/* Hour labels (top) */}
        <div className="flex gap-px">
          <div className="w-12 h-[20px] flex-shrink-0"></div>
          {hours.map((hour, idx) => (
            <div key={idx} className="w-[30px] h-[20px] flex-shrink-0 flex items-center justify-center">
              <div className="text-xs text-gray-500">
                {idx % 3 === 0 ? hour : ''}
              </div>
            </div>
          ))}
        </div>

        {/* Heatmap rows */}
        {days.map((day) => (
          <div key={day} className="flex items-center gap-px">
            {/* Day label */}
            <div className="w-12 flex-shrink-0 h-[30px] flex items-center justify-end pr-2">
              <span className="text-xs font-semibold text-gray-700">{day}</span>
            </div>
            
            {/* Hour cells */}
            {currentData[day].map((intensity, hourIdx) => (
              <div
                key={hourIdx}
                className="w-[30px] h-[30px] flex-shrink-0 group relative"
              >
                <div
                  className={`w-full h-full ${getColor(intensity)} transition-all hover:scale-110 hover:shadow-lg cursor-pointer`}
                  title={`${day} ${hours[hourIdx]}: ${intensity} interactions`}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    <div className="font-semibold">{day} {hours[hourIdx]}</div>
                    <div>{intensity} interactions</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-xs text-gray-600 font-semibold">Less Traffic</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-gray-100 rounded" title="None"></div>
            <div className="w-4 h-4 bg-blue-100 rounded" title="Very Low (1-5)"></div>
            <div className="w-4 h-4 bg-blue-200 rounded" title="Low (5-10)"></div>
            <div className="w-4 h-4 bg-blue-300 rounded" title="Low (10-15)"></div>
            <div className="w-4 h-4 bg-blue-400 rounded" title="Low (15-20)"></div>
          </div>
          <span className="text-xs text-gray-600 font-semibold">Mid Traffic</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-green-200 rounded" title="Mid (20-25)"></div>
            <div className="w-4 h-4 bg-green-300 rounded" title="Mid (25-30)"></div>
            <div className="w-4 h-4 bg-green-400 rounded" title="Mid (30-35)"></div>
            <div className="w-4 h-4 bg-green-500 rounded" title="Mid (35-40)"></div>
          </div>
          <span className="text-xs text-gray-600 font-semibold">Higher Mid Traffic</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-yellow-200 rounded" title="Higher Mid (40-45)"></div>
            <div className="w-4 h-4 bg-yellow-300 rounded" title="Higher Mid (45-50)"></div>
            <div className="w-4 h-4 bg-yellow-400 rounded" title="Higher Mid (50-55)"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded" title="Higher Mid (55-60)"></div>
            <div className="w-4 h-4 bg-yellow-600 rounded" title="Higher Mid (60-65)"></div>
            <div className="w-4 h-4 bg-amber-600 rounded" title="Higher Mid (65-70)"></div>
          </div>
          <span className="text-xs text-gray-600 font-semibold">High Traffic</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-red-300 rounded" title="High (70-75)"></div>
            <div className="w-4 h-4 bg-red-400 rounded" title="High (75-80)"></div>
            <div className="w-4 h-4 bg-red-500 rounded" title="High (80-85)"></div>
            <div className="w-4 h-4 bg-red-600 rounded" title="High (85-90)"></div>
            <div className="w-4 h-4 bg-red-700 rounded" title="High (90-95)"></div>
            <div className="w-4 h-4 bg-red-800 rounded" title="Very High (95-100)"></div>
          </div>
        </div>
      </div>

      {/* Activity Insights */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <h4 className="text-sm font-semibold text-gray-900">Peak Hours</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">4pm - 6pm</p>
          <p className="text-xs text-gray-600 mt-1">Friday evenings are busiest</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <h4 className="text-sm font-semibold text-gray-900">Most Active Day</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">Friday</p>
          <p className="text-xs text-gray-600 mt-1">28% more activity than average</p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
            <h4 className="text-sm font-semibold text-gray-900">Quiet Hours</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">1am - 5am</p>
          <p className="text-xs text-gray-600 mt-1">Consider scheduling posts outside these hours</p>
        </div>
      </div>
    </div>
  );
}