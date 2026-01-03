'use client';

import { TrendingUp, TrendingDown, Eye, MousePointer, Phone, Navigation } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function DashboardVisibilitySnapshot({ visibilityData, period = 'daily' }) {
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
      return (((current - previous) / previous) * 100).toFixed(1);
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
    return <div className="text-gray-500 p-6">No data available</div>;
  }

  const kpis = [
    {
      metric: 'impressions',
      title: 'Impressions',
      value: kpiData?.impressions?.total?.toLocaleString?.() || '0',
      change: `${parseFloat(kpiData?.impressions?.change || 0) > 0 ? '+' : ''}${kpiData?.impressions?.change || '0'}%`,
      isPositive: parseFloat(kpiData?.impressions?.change || 0) >= 0,
      icon: <Eye size={24} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      chartColor: '#2563eb',
      data: kpiData?.impressions?.data || [],
      subtitle: `${kpiData?.impressions?.current?.toLocaleString?.() || '0'} today`
    },
    {
      metric: 'clicks',
      title: 'Clicks',
      value: kpiData?.clicks?.total?.toLocaleString?.() || '0',
      change: `${parseFloat(kpiData?.clicks?.change || 0) > 0 ? '+' : ''}${kpiData?.clicks?.change || '0'}%`,
      isPositive: parseFloat(kpiData?.clicks?.change || 0) >= 0,
      icon: <MousePointer size={24} />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      chartColor: '#dc2626',
      data: kpiData?.clicks?.data || [],
      subtitle: `${kpiData?.ctr || '0'}% CTR`
    },
    {
      metric: 'calls',
      title: 'Calls',
      value: kpiData?.calls?.total?.toLocaleString?.() || '0',
      change: `${parseFloat(kpiData?.calls?.change || 0) > 0 ? '+' : ''}${kpiData?.calls?.change || '0'}%`,
      isPositive: parseFloat(kpiData?.calls?.change || 0) >= 0,
      icon: <Phone size={24} />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      chartColor: '#d97706',
      data: kpiData?.calls?.data || [],
      subtitle: `${kpiData?.calls?.current || '0'} today`
    },
    {
      metric: 'directions',
      title: 'Directions',
      value: kpiData?.directions?.total?.toLocaleString?.() || '0',
      change: `${parseFloat(kpiData?.directions?.change || 0) > 0 ? '+' : ''}${kpiData?.directions?.change || '0'}%`,
      isPositive: parseFloat(kpiData?.directions?.change || 0) >= 0,
      icon: <Navigation size={24} />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      chartColor: '#16a34a',
      data: kpiData?.directions?.data || [],
      subtitle: `${kpiData?.directions?.current || '0'} today`
    }
  ];

  return (
    <div className="rounded-xl border border-gray-200 p-6 h-full flex flex-col bg-transparent">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Visibility Snapshot</h2>
        <p className="text-sm text-gray-500 mt-1">Key performance indicators from your visibility data</p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-3 flex-1">
        {kpis.map((kpi, index) => (
          <div 
            key={index} 
            className={`relative overflow-hidden rounded-lg border p-3 md:p-4 transition-all group flex flex-col justify-between ${
              'border-gray-200 hover:shadow-md'
            }`}>
            {/* Header - Icon & Title */}
            <div className="flex items-start justify-between mb-1 md:mb-1">
              <div className="flex items-center gap-1 md:gap-1.5">
                <div className={`w-6 h-6 ${kpi.bgColor} rounded flex items-center justify-center flex-shrink-0 ${kpi.color}`}>
                  {kpi.icon}
                </div>
                <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide leading-6">
                  {kpi.title}
                </h3>
              </div>
            </div>

            {/* Content Row - Value, Subtitle & Chart with Change on right */}
            <div className="flex items-end justify-between gap-0.5 md:gap-0.5">
              <div>
                <p className="text-base font-bold text-gray-900">{kpi.value}</p>
                <p className="text-sm text-gray-500 leading-none">{kpi.subtitle}</p>
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
              {((kpiData?.clicks?.total || 0) + (kpiData?.calls?.total || 0) + (kpiData?.directions?.total || 0)).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-0.5">Click-Through Rate</p>
            <p className="text-base font-bold text-indigo-600">{kpiData?.ctr || '0'}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-0.5">Conversion Rate</p>
            <p className="text-base font-bold text-gray-900">
              {(((kpiData?.calls?.total || 0) / (kpiData?.impressions?.total || 1)) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
