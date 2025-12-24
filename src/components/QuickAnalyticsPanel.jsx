'use client';

import { TrendingUp, TrendingDown, MessageSquare, ThumbsUp, ThumbsDown, Clock, BarChart3, AlertCircle, Eye, Target, Zap, X } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useState, useEffect, useMemo } from 'react';

export default function QuickAnalyticsPanel({ filteredReviews, allReviews }) {
  const [period, setPeriod] = useState('weekly'); // weekly, monthly, yearly
  const [activeTab, setActiveTab] = useState('metrics'); // 'metrics' or 'advanced'
  const metrics = useMemo(() => {
    // Base numbers for each period
    const baseTotals = {
      weekly: 12,
      monthly: 80,
      yearly: 640
    };

    const totalReviews = baseTotals[period];
    
    // Calculate metrics based on realistic distributions
    const positiveReviews = Math.ceil(totalReviews * 0.65); // 65% positive
    const negativeReviews = Math.ceil(totalReviews * 0.20); // 20% negative
    const neutralReviews = totalReviews - positiveReviews - negativeReviews; // remaining
    const internalNegatives = Math.floor(negativeReviews * 0.25); // 25% of negatives are internal
    const repliedReviews = Math.ceil(totalReviews * 0.75); // 75% replied
    const unrepliedReviews = totalReviews - repliedReviews;
    const resolvedReviews = Math.ceil(totalReviews * 0.85); // 85% resolved
    const unresolvedReviews = totalReviews - resolvedReviews;
    const googleReviews = Math.ceil(totalReviews * 0.60); // 60% from Google
    const internalReviews = totalReviews - googleReviews;
    
    // Calculate averages
    const averageRating = (4.2).toFixed(1); // Average 4.2 out of 5
    const responseRate = Math.round((repliedReviews / totalReviews) * 100);
    
    // Calculate per week based on period
    const avgReviewsPerWeek = period === 'weekly' ? totalReviews : period === 'monthly' ? Math.round(totalReviews / 4) : Math.round(totalReviews / 52);
    
    // Average reply time in hours
    const avgReplyTime = period === 'weekly' ? 12 : period === 'monthly' ? 18 : 24;
    
    // Trend - positive growth trend
    const trend = period === 'weekly' ? 8 : period === 'monthly' ? 12 : 25;
    
    return {
      totalReviews,
      positiveReviews,
      negativeReviews,
      neutralReviews,
      internalNegatives,
      unrepliedReviews,
      resolvedReviews,
      unresolvedReviews,
      googleReviews,
      internalReviews,
      averageRating,
      responseRate,
      avgReviewsPerWeek,
      avgReplyTime,
      trend,
      repliedReviews
    };
  }, [period]);

  // Format number based on period
  const formatNumber = (num) => {
    const number = parseInt(num) || 0;
    if (period === 'weekly') {
      return String(number).padStart(2, '0');
    } else if (period === 'yearly') {
      return String(number).padStart(3, '0');
    }
    return String(number).padStart(2, '0'); // default to 2 digits
  };

  const formatValue = (value) => {
    // For percentage values, don't pad
    if (value.toString().includes('%')) {
      return value;
    }
    // For time values (h), don't pad
    if (value.toString().includes('h')) {
      return value;
    }
    // For rating values, return as is
    if (parseFloat(value) < 5) {
      return value;
    }
    // For regular numbers, apply padding
    return formatNumber(value);
  };

  const generateChartData = (value) => {
    const variation = value * 0.15;
    return Array.from({ length: 7 }, (_, i) => ({
      value: Math.max(0, value - variation + Math.random() * variation * 2)
    }));
  };

  const MetricCard = ({ icon: Icon, label, value, subtext, trend, color = 'blue', chartData }) => {
    const colorMap = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-600' },
      green: { bg: 'bg-green-50', text: 'text-green-600', icon: 'text-green-600' },
      red: { bg: 'bg-red-50', text: 'text-red-600', icon: 'text-red-600' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-600', icon: 'text-amber-600' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'text-purple-600' }
    };

    const colors = colorMap[color];
    const displayValue = formatValue(value);

    return (
      <div className="relative overflow-hidden rounded-lg border border-gray-200 p-2.5 hover:shadow-md transition-all group flex flex-col justify-between h-full w-full">
        {/* Header - Icon & Label */}
        <div className="flex items-start justify-between mb-2 w-full">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <div className={`w-6 h-6 ${colors.bg} rounded flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
              <Icon size={14} />
            </div>
            <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide truncate">
              {label}
            </h3>
          </div>
        </div>

        {/* Content Row - Value & Chart with Trend */}
        <div className="flex items-end justify-between gap-2 w-full">
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold text-gray-900 truncate font-mono">{displayValue}</p>
            {subtext && <p className="text-xs text-gray-500 leading-none">{subtext}</p>}
          </div>

          <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
            {/* Mini Sparkline Chart */}
            {chartData && (
              <div className="h-5 w-12">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={colors.text.replace('text-', '#')}
                      strokeWidth={1.5}
                      dot={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Trend */}
            {trend !== undefined && (
              <div className={`flex items-center gap-0.5 text-xs font-semibold ${
                trend >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend >= 0 ? (
                  <TrendingUp size={10} />
                ) : (
                  <TrendingDown size={10} />
                )}
                {Math.abs(trend)}%
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 p-5 w-full overflow-x-hidden overflow-y-visible">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between mb-6 w-full flex-wrap gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900">Review Analytics</h2>
          <p className="text-sm text-gray-500 mt-0.5">Key metrics at a glance</p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg flex-shrink-0 relative z-10">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'metrics'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => setActiveTab(activeTab === 'advanced' ? 'metrics' : 'advanced')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'advanced'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            Advanced
          </button>
        </div>

        {/* Period Selector - Only show on Metrics tab */}
        {activeTab === 'metrics' && (
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg flex-shrink-0">
            <button
              onClick={() => setPeriod('weekly')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                period === 'weekly'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setPeriod('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                period === 'monthly'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod('yearly')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                period === 'yearly'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Yearly
            </button>
          </div>
        )}
      </div>

      {/* METRICS SECTION - Always Visible */}
      <div className="w-full">
        {/* Metrics Grid - 6 column layout for full metrics in compact view */}
        <div className="grid grid-cols-6 gap-2.5 w-full">
        <MetricCard 
          icon={MessageSquare} 
          label="Total Reviews" 
          value={metrics.totalReviews}
          trend={metrics.trend}
          color="blue"
          chartData={generateChartData(metrics.totalReviews)}
        />
        <MetricCard 
          icon={ThumbsUp} 
          label="Positive" 
          value={metrics.positiveReviews}
          subtext={`${metrics.totalReviews > 0 ? Math.round((metrics.positiveReviews / metrics.totalReviews) * 100) : 0}%`}
          color="green"
          chartData={generateChartData(metrics.positiveReviews)}
        />
        <MetricCard 
          icon={ThumbsDown} 
          label="Negative" 
          value={metrics.negativeReviews}
          subtext={`${metrics.totalReviews > 0 ? Math.round((metrics.negativeReviews / metrics.totalReviews) * 100) : 0}%`}
          color="red"
          chartData={generateChartData(metrics.negativeReviews)}
        />
        <MetricCard 
          icon={Target} 
          label="Response Rate" 
          value={`${metrics.responseRate}%`}
          subtext={`${metrics.repliedReviews} replied`}
          color="purple"
          chartData={generateChartData(metrics.responseRate)}
        />
        <MetricCard 
          icon={Clock} 
          label="Avg Reply Time" 
          value={`${metrics.avgReplyTime}h`}
          subtext="hours"
          color="blue"
          chartData={generateChartData(metrics.avgReplyTime)}
        />
        <MetricCard 
          icon={BarChart3} 
          label="Reviews/Week" 
          value={metrics.avgReviewsPerWeek}
          subtext="average"
          color="green"
          chartData={generateChartData(metrics.avgReviewsPerWeek)}
        />

        <MetricCard 
          icon={AlertCircle} 
          label="Unreplied" 
          value={metrics.unrepliedReviews}
          subtext="need reply"
          color="amber"
          chartData={generateChartData(metrics.unrepliedReviews)}
        />
        <MetricCard 
          icon={Eye} 
          label="Avg Rating" 
          value={metrics.averageRating}
          subtext="out of 5"
          color="purple"
          chartData={generateChartData(metrics.averageRating * 10)}
        />
        <MetricCard 
          icon={Zap} 
          label="Resolved" 
          value={metrics.resolvedReviews}
          subtext={`${metrics.unresolvedReviews} pending`}
          color="green"
          chartData={generateChartData(metrics.resolvedReviews)}
        />
        <MetricCard 
          icon={MessageSquare} 
          label="Google Reviews" 
          value={metrics.googleReviews}
          subtext={`${metrics.totalReviews > 0 ? Math.round((metrics.googleReviews / metrics.totalReviews) * 100) : 0}%`}
          color="blue"
          chartData={generateChartData(metrics.googleReviews)}
        />
        <MetricCard 
          icon={MessageSquare} 
          label="Internal Reviews" 
          value={metrics.internalReviews}
          subtext={`${metrics.totalReviews > 0 ? Math.round((metrics.internalReviews / metrics.totalReviews) * 100) : 0}%`}
          color="purple"
          chartData={generateChartData(metrics.internalReviews)}
        />
        <MetricCard 
          icon={ThumbsDown} 
          label="Internal Negatives" 
          value={metrics.internalNegatives}
          subtext="not posted"
          color="red"
          chartData={generateChartData(metrics.internalNegatives)}
        />
      </div>
      </div>

      {/* ADVANCED ANALYTICS - Expand/Collapse Below Metrics */}
      {activeTab === 'advanced' && (
      <div className="w-full mt-6">
        {/* Advanced Cards - Single Row Layout */}
        <div className="grid gap-3 w-full" style={{ 
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: 'auto'
        }}>
        
        {/* Recent Critical Reviews */}
        <div className="relative overflow-hidden rounded-lg border border-gray-200 p-2 hover:shadow-md transition-all group flex flex-col justify-between h-full w-full"
             style={{ gridColumn: 'span 1' }}>
          {/* Header - Icon & Label */}
          <div className="flex items-start justify-between mb-1.5 w-full">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <div className="w-6 h-6 bg-red-50 rounded flex items-center justify-center flex-shrink-0 text-red-600">
                <AlertCircle size={14} />
              </div>
              <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide truncate">
                Critical Reviews
              </h3>
            </div>
          </div>
          {/* Content */}
          <div className="space-y-1 text-xs">
            <div className="flex items-start gap-2 pb-2 border-b border-gray-200">
              <span className="text-gray-600 font-bold flex-shrink-0">★</span>
              <div className="min-w-0">
                <p className="text-gray-900 font-medium text-sm">1-star</p>
                <p className="text-gray-700 text-sm break-words line-clamp-1">"Damaged"</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600 font-bold flex-shrink-0">★</span>
              <div className="min-w-0">
                <p className="text-gray-900 font-medium text-sm">2-star</p>
                <p className="text-gray-700 text-sm break-words line-clamp-1">"Slow"</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Action Suggestions */}
        <div className="flex-1 min-w-[180px] relative overflow-hidden rounded-lg border border-gray-200 p-2 hover:shadow-md transition-all group flex flex-col justify-between h-full w-full">
          {/* Header - Icon & Label */}
          <div className="flex items-start justify-between mb-1.5 w-full">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <div className="w-6 h-6 bg-green-50 rounded flex items-center justify-center flex-shrink-0 text-green-600">
                <Zap size={14} />
              </div>
              <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide truncate">
                Action Items
              </h3>
            </div>
          </div>
          {/* Content */}
          <div className="space-y-1.5">
            {/* Reply Action */}
            <div className="bg-green-50 rounded border border-green-200 p-1.5">
              <p className="text-xs font-semibold text-green-700 mb-0.5">📧 Respond to Reviews</p>
              <p className="text-xs text-gray-700"><span className="font-bold text-green-600">{metrics.unrepliedReviews}</span> waiting for reply</p>
            </div>
            {/* Focus Action */}
            <div className="bg-amber-50 rounded border border-amber-200 p-1.5">
              <p className="text-xs font-semibold text-amber-700 mb-0.5">🎯 Focus Areas</p>
              <p className="text-xs text-gray-700">Improve <span className="font-bold text-amber-600">delivery</span> performance</p>
            </div>
          </div>
        </div>

        {/* Keywords - Negative & Positive */}
        <div className="relative overflow-hidden rounded-lg border border-gray-200 p-2 hover:shadow-md transition-all group flex flex-col justify-between h-full w-full">
          {/* Header - Icon & Label */}
          <div className="flex items-start justify-between mb-1.5 w-full">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <div className="w-6 h-6 bg-purple-50 rounded flex items-center justify-center flex-shrink-0 text-purple-600">
                <Target size={14} />
              </div>
              <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide truncate">
                Keywords
              </h3>
            </div>
          </div>
          {/* Content */}
          <div className="space-y-1.5 text-xs">
            <div>
              <p className="text-gray-500 font-medium mb-1">Negative:</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">slow</span>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">quality</span>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">support</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500 font-medium mb-1">Positive:</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">fast</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">excellent</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">helpful</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      )}

    </div>
  );
}
