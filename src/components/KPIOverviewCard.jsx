'use client';

import { TrendingUp, TrendingDown, Eye, MousePointer, Phone, Navigation } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function KPIOverviewCard({ visibilityData, period = 'daily' }) {
  // Calculate KPI metrics from visibility data
  const calculateKPIs = () => {
    if (!visibilityData || visibilityData.length === 0) return null;

    const currentPeriod = visibilityData[visibilityData.length - 1];
    const previousPeriod = visibilityData[visibilityData.length - 2];

    // Calculate totals
    const totalImpressions = visibilityData.reduce((sum, d) => sum + d.impressions, 0);
    const totalClicks = visibilityData.reduce((sum, d) => sum + d.clicks, 0);
    const totalCalls = visibilityData.reduce((sum, d) => sum + d.calls, 0);
    const totalDirections = visibilityData.reduce((sum, d) => sum + d.directions, 0);

    // Calculate changes
    const calcChange = (current, previous) => {
      if (!previous || previous === 0) return 0;
      return ((current - previous) / previous * 100).toFixed(1);
    };

    const impressionsChange = calcChange(currentPeriod.impressions, previousPeriod.impressions);
    const clicksChange = calcChange(currentPeriod.clicks, previousPeriod.clicks);
    const callsChange = calcChange(currentPeriod.calls, previousPeriod.calls);
    const directionsChange = calcChange(currentPeriod.directions, previousPeriod.directions);

    // Calculate click-through rate
    const ctr = ((totalClicks / totalImpressions) * 100).toFixed(1);

    return {
      impressions: {
        total: totalImpressions,
        current: currentPeriod.impressions,
        change: impressionsChange,
        data: visibilityData.map(d => d.impressions)
      },
      clicks: {
        total: totalClicks,
        current: currentPeriod.clicks,
        change: clicksChange,
        data: visibilityData.map(d => d.clicks)
      },
      calls: {
        total: totalCalls,
        current: currentPeriod.calls,
        change: callsChange,
        data: visibilityData.map(d => d.calls)
      },
      directions: {
        total: totalDirections,
        current: currentPeriod.directions,
        change: directionsChange,
        data: visibilityData.map(d => d.directions)
      },
      ctr: ctr
    };
  };

  const kpiData = calculateKPIs();

  if (!kpiData) {
    return <div className="text-gray-500">No data available</div>;
  }

  const kpis = [
    {
      title: 'Impressions',
      value: kpiData.impressions.total.toString(),
      change: `${parseFloat(kpiData.impressions.change) > 0 ? '+' : ''}${kpiData.impressions.change}%`,
      isPositive: parseFloat(kpiData.impressions.change) >= 0,
      icon: <Eye size={20} />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      chartColor: '#a855f7',
      data: kpiData.impressions.data,
      subtitle: `${kpiData.impressions.current.toString()} latest`
    },
    {
      title: 'Clicks',
      value: kpiData.clicks.total.toString(),
      change: `${parseFloat(kpiData.clicks.change) > 0 ? '+' : ''}${kpiData.clicks.change}%`,
      isPositive: parseFloat(kpiData.clicks.change) >= 0,
      icon: <MousePointer size={20} />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      chartColor: '#6366f1',
      data: kpiData.clicks.data,
      subtitle: `${kpiData.ctr}% CTR`
    },
    {
      title: 'Calls',
      value: kpiData.calls.total.toString(),
      change: `${parseFloat(kpiData.calls.change) > 0 ? '+' : ''}${kpiData.calls.change}%`,
      isPositive: parseFloat(kpiData.calls.change) >= 0,
      icon: <Phone size={20} />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      chartColor: '#10b981',
      data: kpiData.calls.data,
      subtitle: `${kpiData.calls.current} latest`
    },
    {
      title: 'Directions',
      value: kpiData.directions.total.toString(),
      change: `${parseFloat(kpiData.directions.change) > 0 ? '+' : ''}${kpiData.directions.change}%`,
      isPositive: parseFloat(kpiData.directions.change) >= 0,
      icon: <Navigation size={20} />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      chartColor: '#f59e0b',
      data: kpiData.directions.data,
      subtitle: `${kpiData.directions.current} latest`
    }
  ];

  // Determine period label
  const periodLabel = period === 'daily' ? 'This Week' : period === 'weekly' ? 'This Month' : 'Last 6 Months';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Visibility Snapshot</h2>
          <p className="text-sm text-gray-500 mt-1">Key performance indicators from your visibility data</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Period</p>
          <p className="text-sm font-semibold text-gray-900">{periodLabel}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {kpis.map((kpi, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg border border-gray-200 p-1.5 hover:shadow-md transition-all group bg-white">
            {/* Header - Icon & Title */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className={`w-6 h-6 ${kpi.bgColor} rounded flex items-center justify-center flex-shrink-0 ${kpi.color}`}>
                  {kpi.icon}
                </div>
                <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide leading-6">
                  {kpi.title}
                </h3>
              </div>
            </div>

            {/* Content Row - Value, Subtitle & Chart with Change on right */}
            <div className="flex items-end justify-between gap-1">
              <div>
                <p className="text-base font-bold text-gray-900">{kpi.value}</p>
                <p className="text-xs text-gray-500 leading-none">{kpi.subtitle}</p>
              </div>

              <div className="flex flex-col items-end gap-0.5">
                {/* Mini Sparkline Chart */}
                <div className="h-6 w-12 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={kpi.data.map((value, i) => ({ value, index: i }))}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={kpi.chartColor}
                        strokeWidth={1.5}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Change percentage */}
                <div className={`flex items-center gap-0.5 text-xs font-semibold ${
                  kpi.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.isPositive ? (
                    <TrendingUp size={9} />
                  ) : (
                    <TrendingDown size={9} />
                  )}
                  {kpi.change}
                </div>
              </div>
            </div>

            {/* Hover effect gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
                 style={{ background: `linear-gradient(135deg, ${kpi.chartColor}, transparent)` }}>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Bar with Visibility Data */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xs text-gray-600 mb-0.5">Total Engagement</p>
            <p className="text-base font-bold text-gray-900">
              {(kpiData.clicks.total + kpiData.calls.total + kpiData.directions.total).toString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-0.5">Click-Through Rate</p>
            <p className="text-base font-bold text-indigo-600">{kpiData.ctr}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-0.5">Conversion Rate</p>
            <p className="text-base font-bold text-gray-900">
              {((kpiData.calls.total / kpiData.impressions.total) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
