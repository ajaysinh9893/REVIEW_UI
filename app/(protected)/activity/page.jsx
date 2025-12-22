'use client';

import { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';

export default function ActivityPage() {
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
  const [heatmapActivityType, setHeatmapActivityType] = useState('calls');

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);

  // Only active slots: [dayIndex, hour, count] - no zeros, no nulls
  const activityData = {
    calls: [[0,9,1],[0,10,2],[0,14,3],[1,11,2],[1,15,3],[1,16,1],[2,9,1],[2,12,2],[2,13,1],[3,10,4],[3,14,1],[4,11,2],[4,16,4],[4,17,1],[5,10,1],[5,11,1],[5,12,1],[5,13,1],[5,14,1],[6,12,1],[6,13,1],[6,14,1]],
    clicks: [[0,8,2],[0,9,3],[0,10,2],[0,18,2],[0,19,4],[0,20,1],[1,9,1],[1,10,1],[1,20,3],[1,21,4],[1,22,1],[2,12,2],[2,13,1],[2,19,2],[3,10,1],[3,11,1],[3,20,3],[4,9,1],[4,10,1],[4,18,4],[4,19,1],[5,11,1],[5,12,1],[5,14,1],[5,15,2],[5,16,1],[6,13,1],[6,14,1],[6,15,1]],
    directions: [[0,11,2],[0,12,4],[0,13,1],[0,17,2],[0,18,3],[1,12,3],[1,13,1],[1,17,4],[1,18,2],[2,11,1],[2,12,1],[2,17,2],[2,18,1],[3,12,3],[3,13,2],[3,17,1],[3,18,1],[4,12,2],[4,13,1],[4,17,4],[4,18,1],[5,11,1],[5,12,3],[5,13,2],[5,14,2],[6,12,1],[6,13,1],[6,14,1],[6,15,1]]
  };

  const toMatrix = (data) => {
    const m = Array.from({ length: 7 }, () => Array(24).fill(0));
    data.forEach(([d, h, c]) => { m[d][h] = c; });
    return m;
  };

  const toPercentMatrix = (matrix) => {
    const max = Math.max(...matrix.flat());
    return max === 0 ? matrix : matrix.map(row => row.map(v => Math.round((v / max) * 100)));
  };

  const getTopPeaks = (data) => {
    return [...data].sort((a, b) => b[2] - a[2]).slice(0, 3).map(([d, h, c]) => ({ d, h, c }));
  };

  const fmtHour = (h) => h === 0 ? '12AM' : h === 12 ? '12PM' : h < 12 ?  `${h}AM` : `${h-12}PM`;

  const exportCSV = (matrix, type) => {
    const csv = ['Day,' + hoursOfDay.map(fmtHour).join(','), ...matrix.map((row, i) => daysOfWeek[i] + ',' + row.join(','))].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `heatmap_${type}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const currentData = activityData[heatmapActivityType] || [];
  const matrix = toMatrix(currentData);
  const peaks = getTopPeaks(currentData);
  const total = currentData.reduce((sum, [,,c]) => sum + c, 0);

  return (
    <div className="min-h-screen">
      <div className="p-10 max-w-7xl mx-auto pr-24">
          {/* Activity Heatmaps */}
          <div className="rounded-xl border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 size={20} className="text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900">Activity Heatmaps</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  {['calls', 'clicks', 'directions'].map(t => (
                    <button key={t} onClick={() => setHeatmapActivityType(t)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${heatmapActivityType === t ? `bg-white shadow-sm ${t === 'calls' ? 'text-emerald-600' : t === 'clicks' ? 'text-indigo-600' : 'text-amber-600'}` : 'text-gray-600'}`}>
                      {t === 'clicks' ? 'Clicks' : t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
                <button onClick={() => exportCSV(matrix, heatmapActivityType)} className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">CSV</button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 mb-4 text-sm">
              <span className="font-semibold text-gray-900">Total: {total}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Peaks: </span>
              {peaks.map((p, i) => (
                <span key={i} className={`px-2 py-0.5 text-xs font-semibold rounded ${i === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                  #{i+1} {daysOfWeek[p.d]} {fmtHour(p.h)} ({p.c})
                </span>
              ))}
            </div>

            {/* Activity Timeline - Compact Number View */}
            <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-3">
              <div className="space-y-1">
                {(() => {
                  const selectedData = activityData[heatmapActivityType] || [];
                  if (selectedData.length === 0) return <p className="text-sm text-gray-500 text-center py-4">No activity recorded</p>;
                  const maxVal = Math.max(...selectedData.map(a => a[2]));
                  const barColors = { calls: 'bg-emerald-500', clicks: 'bg-indigo-500', directions: 'bg-amber-500' };
                  return selectedData.map((d, idx) => {
                    const val = d[2];
                    const pct = Math.round((val / maxVal) * 100);
                    return (
                      <div key={idx} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 transition-all text-xs">
                        <span className="font-semibold text-gray-700 min-w-[80px]">{daysOfWeek[d[0]]} {fmtHour(d[1])}</span>
                        <div className="flex-1 bg-gray-300 rounded-full h-1.5 overflow-hidden min-w-[100px]">
                          <div className={`h-full ${barColors[heatmapActivityType]}`} style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className="font-bold text-gray-900 min-w-[30px] text-right">{val}</span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-gray-500">Intensity: </span>
                {['None', 'Low', 'Medium', 'High', 'Peak'].map((label, i) => {
                  const colors = { calls: ['bg-gray-100','bg-emerald-100','bg-emerald-300','bg-emerald-500','bg-emerald-700'], clicks: ['bg-gray-100','bg-indigo-100','bg-indigo-300','bg-indigo-500','bg-indigo-700'], directions: ['bg-gray-100','bg-amber-100','bg-amber-300','bg-amber-500','bg-amber-700'] };
                  return (
                    <div key={label} className="flex items-center gap-1">
                      <div className={`w-4 h-4 rounded ${colors[heatmapActivityType][i]}`}></div>
                      <span className="text-xs text-gray-500">{label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-200 ring-2 ring-yellow-400"></div>
                <span className="text-xs text-gray-500">Top 3 Peak Slots</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
