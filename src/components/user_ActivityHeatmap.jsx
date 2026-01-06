'use client';

import { useState } from 'react';
import { Phone, Navigation, MousePointer, Eye, Calendar, ChevronDown } from 'lucide-react';

export default function ActivityHeatmap() {
  const [selectedMetric, setSelectedMetric] = useState('all'); // 'all', 'calls', 'directions', 'clicks', 'views'
  const [showMetricDropdown, setShowMetricDropdown] = useState(false);

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

  // Get color based on intensity (0-100) - single blue color with intensity variations
  const getColor = (intensity) => {
    if (intensity === 0) return 'bg-gray-100';
    if (intensity < 15) return 'bg-blue-100';
    if (intensity < 30) return 'bg-blue-200';
    if (intensity < 45) return 'bg-blue-300';
    if (intensity < 60) return 'bg-blue-400';
    if (intensity < 75) return 'bg-blue-500';
    if (intensity < 90) return 'bg-blue-600';
    return 'bg-blue-700';
  };

  // Get color style using blue gradient with intensity
  const getColorStyle = (intensity) => {
    if (intensity === 0) return { backgroundColor: '#f3f4f6' };
    if (intensity < 15) return { backgroundColor: '#dbeafe' }; // blue-100
    if (intensity < 30) return { backgroundColor: '#bfdbfe' }; // blue-200
    if (intensity < 45) return { backgroundColor: '#93c5fd' }; // blue-300
    if (intensity < 60) return { backgroundColor: '#60a5fa' }; // blue-400
    if (intensity < 75) return { backgroundColor: '#3b82f6' }; // blue-500
    if (intensity < 90) return { backgroundColor: '#2563eb' }; // blue-600
    return { backgroundColor: '#1d4ed8' }; // blue-700
  };

  // Get tooltip position class based on hour index to avoid off-screen tooltips
  const getTooltipPosition = (hourIdx, dayIdx) => {
    const totalDays = days.length;
    const isLastRow = dayIdx === totalDays - 1;
    
    if (hourIdx === 0) {
      // First column: always shift right by 1
      return 'left-0 translate-x-8';
    } else if (hourIdx === 23) {
      // Last column: shift left by 1
      return 'right-0 -translate-x-8';
    } else {
      // Middle columns
      if (isLastRow) {
        return 'left-1/2 -translate-x-1/2 -translate-x-8'; // Last row: center then shift left by 1
      } else {
        return 'left-1/2 -translate-x-1/2'; // Other rows: center
      }
    }
  };

  // Get tooltip vertical position based on day index to avoid off-screen tooltips
  const getTooltipVerticalPosition = (dayIdx) => {
    const totalDays = days.length;
    if (dayIdx === 0) return 'top-full mt-2 translate-y-3'; // First row: show below by -1 position
    if (dayIdx === totalDays - 1) return 'bottom-full mb-2 -translate-y-3'; // Last row: show above by -1 position (reverse of top)
    return 'bottom-full mb-2'; // Middle rows: show above
  };

  return (
    <div className="w-full h-full">
      <div className="rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm h-full flex flex-col">
      <div className="mb-2">
        <div className="flex flex-row items-center justify-between gap-4 mb-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-gray-900">Weekly Activity Heatmap</h3>
            <p className="text-xs md:text-sm text-gray-600 mt-1">Darker colors indicate higher activity</p>
          </div>
          
          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMetricDropdown(!showMetricDropdown)}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-all text-sm md:text-base font-medium"
            >
              <Eye size={16} className="md:w-[18px] md:h-[18px]" />
              {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
              <ChevronDown size={16} className={`transition-transform ${showMetricDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showMetricDropdown && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMetricDropdown(false)}
                />
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {[
                    { id: 'all', label: 'All Metrics', icon: Eye },
                    { id: 'calls', label: 'Calls', icon: Phone },
                    { id: 'directions', label: 'Directions', icon: Navigation },
                    { id: 'clicks', label: 'Clicks', icon: MousePointer },
                    { id: 'views', label: 'Views', icon: Eye }
                  ].map((option) => {
                    const OptionIcon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSelectedMetric(option.id);
                          setShowMetricDropdown(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all ${
                          selectedMetric === option.id
                            ? 'bg-indigo-50 text-indigo-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        } ${option.id === 'all' ? 'border-b border-gray-200' : ''}`}
                      >
                        <OptionIcon size={16} />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Heatmap Grid - Responsive sizing, scrollbar only when needed */}
      <div className="w-full overflow-x-auto flex-1 scrollbar-hide pt-6" style={{ scrollbarGutter: 'stable' }}>
        <div className="flex flex-col gap-px w-full\">
        {/* Hour labels (top) */}
        <div className="flex gap-px">
          <div className="w-10 h-[20px] flex-shrink-0"></div>
          {hours.map((hour, idx) => (
            <div key={idx} className="w-[29px] h-[20px] flex-shrink-0 flex items-center justify-center">
              <div className="text-xs text-gray-500">
                {idx % 3 === 0 ? hour : ''}
              </div>
            </div>
          ))}
        </div>

        {/* Heatmap rows */}
        {days.map((day, dayIdx) => (
          <div key={day} className="flex items-center gap-px">
            {/* Day label */}
            <div className="w-10 flex-shrink-0 h-[28px] flex items-center justify-end pr-2">
              <span className="text-xs font-semibold text-gray-700">{day}</span>
            </div>
            
            {/* Hour cells */}
            {currentData[day].map((intensity, hourIdx) => (
              <div
                key={hourIdx}
                className="w-[29px] h-[28px] flex-shrink-0 group relative"
              >
                <div
                  style={getColorStyle(intensity)}
                  className="w-full h-full transition-all hover:scale-110 hover:shadow-lg cursor-pointer rounded"
                >
                </div>
                {/* Tooltip on hover - positioned outside the colored cell */}
                <div 
                  className={`absolute ${getTooltipVerticalPosition(dayIdx)} ${getTooltipPosition(hourIdx, dayIdx)} px-2 py-1 bg-white text-gray-900 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-gray-200`}
                  style={dayIdx === days.length - 1 && hourIdx !== 0 && hourIdx !== 23 ? { left: 'calc(50% - 32px)' } : {}}
                >
                  <div className="font-semibold">{day} {hours[hourIdx]}</div>
                  <div>{intensity} interactions</div>
                </div>
              </div>
            ))}
          </div>
        ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Activity Intensity</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Less</span>
            <div className="flex gap-1">
              <div className="w-6 h-6 bg-gray-100 rounded"></div>
              <div className="w-6 h-6 bg-blue-100 rounded"></div>
              <div className="w-6 h-6 bg-blue-200 rounded"></div>
              <div className="w-6 h-6 bg-blue-300 rounded"></div>
              <div className="w-6 h-6 bg-blue-400 rounded"></div>
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
              <div className="w-6 h-6 bg-blue-700 rounded"></div>
            </div>
            <span className="text-xs text-gray-500">More</span>
          </div>
        </div>
      </div>

      {/* Activity Insights */}
      <div className="mt-6">
        <div className="flex gap-4 md:gap-6 justify-center flex-wrap">
          {/* Peak Hours */}
          <div className="flex flex-col items-center">
            <p className="text-xs md:text-sm font-semibold text-gray-700 mb-2">Peak Hours</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">4pm - 6pm</p>
          </div>

          {/* Most Active Day */}
          <div className="flex flex-col items-center">
            <p className="text-xs md:text-sm font-semibold text-gray-700 mb-2">Most Active Day</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">Friday</p>
          </div>

          {/* Quiet Hours */}
          <div className="flex flex-col items-center">
            <p className="text-xs md:text-sm font-semibold text-gray-700 mb-2">Quiet Hours</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">1am - 5am</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}