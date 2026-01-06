'use client';

import React from 'react';
import { TrendingUp, TrendingDown, MessageSquare, ThumbsUp, ThumbsDown, Clock, BarChart3, AlertCircle, Eye, Target, Zap, X, Send, Globe, Building2, Lock, Star, Flag, ChevronDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useState, useEffect, useMemo } from 'react';

function QuickAnalyticsPanel({ filteredReviews, allReviews }) {
  const [period, setPeriod] = useState('weekly'); // weekly, monthly, yearly, all
  const [activeTab, setActiveTab] = useState('metrics'); // 'metrics' or 'advanced'
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const metrics = useMemo(() => {
    // Base numbers for current and previous periods
    const baseTotals = {
      weekly: 12,
      monthly: 80,
      yearly: 640,
      all: 2400
    };

    const previousBaseTotals = {
      weekly: 11,      // Last week had 11 reviews
      monthly: 71,     // Last month had 71 reviews
      yearly: 580,     // Last year had 580 reviews
      all: 2100        // Previous lifetime was 2100
    };

    const totalReviews = baseTotals[period];
    const previousTotalReviews = previousBaseTotals[period];
    
    // Helper function to calculate percentage change
    const calculateTrend = (current, previous) => {
      if (previous === 0) return 0;
      return Math.round(((current - previous) / previous) * 100);
    };
    
    // Calculate metrics based on realistic distributions
    const positiveReviews = Math.ceil(totalReviews * 0.65);
    const previousPositiveReviews = Math.ceil(previousTotalReviews * 0.63); // Slightly lower before
    
    const negativeReviews = Math.ceil(totalReviews * 0.20);
    const previousNegativeReviews = Math.ceil(previousTotalReviews * 0.22); // Higher before
    
    const neutralReviews = totalReviews - positiveReviews - negativeReviews;
    
    const internalNegatives = Math.floor(negativeReviews * 0.25);
    const previousInternalNegatives = Math.floor(previousNegativeReviews * 0.28);
    
    const repliedReviews = Math.ceil(totalReviews * 0.75);
    const previousRepliedReviews = Math.ceil(previousTotalReviews * 0.70); // Lower response before
    
    const unrepliedReviews = totalReviews - repliedReviews;
    const previousUnrepliedReviews = previousTotalReviews - previousRepliedReviews;
    
    const resolvedReviews = Math.ceil(totalReviews * 0.85);
    const previousResolvedReviews = Math.ceil(previousTotalReviews * 0.80);
    
    const unresolvedReviews = totalReviews - resolvedReviews;
    const previousUnresolvedReviews = previousTotalReviews - previousResolvedReviews;
    
    const googleReviews = Math.ceil(totalReviews * 0.60);
    const previousGoogleReviews = Math.ceil(previousTotalReviews * 0.58);
    
    const internalReviews = totalReviews - googleReviews;
    const previousInternalReviews = previousTotalReviews - previousGoogleReviews;
    
    // Calculate averages
    const averageRating = (4.2).toFixed(1);
    const previousAverageRating = (4.0).toFixed(1); // Was lower before
    
    const responseRate = Math.round((repliedReviews / totalReviews) * 100);
    const previousResponseRate = Math.round((previousRepliedReviews / previousTotalReviews) * 100);
    
    // Calculate per week based on period
    const avgReviewsPerWeek = period === 'weekly' ? totalReviews : period === 'monthly' ? Math.round(totalReviews / 4) : period === 'yearly' ? Math.round(totalReviews / 52) : Math.round(totalReviews / 52);
    const previousAvgReviewsPerWeek = period === 'weekly' ? previousTotalReviews : period === 'monthly' ? Math.round(previousTotalReviews / 4) : period === 'yearly' ? Math.round(previousTotalReviews / 52) : Math.round(previousTotalReviews / 52);
    
    // Average reply time in hours
    const avgReplyTime = period === 'weekly' ? 12 : period === 'monthly' ? 18 : period === 'yearly' ? 24 : 20;
    const previousAvgReplyTime = period === 'weekly' ? 14 : period === 'monthly' ? 20 : period === 'yearly' ? 26 : 22; // Was slower before
    
    // Calculate trends based on actual comparison
    const trend = calculateTrend(totalReviews, previousTotalReviews);
    const positiveTrend = calculateTrend(positiveReviews, previousPositiveReviews);
    const negativeTrend = calculateTrend(negativeReviews, previousNegativeReviews);
    const responseRateTrend = calculateTrend(responseRate, previousResponseRate);
    const replyTimeTrend = calculateTrend(avgReplyTime, previousAvgReplyTime); // Note: negative is good here
    const resolvedTrend = calculateTrend(resolvedReviews, previousResolvedReviews);
    const unrepliedTrend = calculateTrend(unrepliedReviews, previousUnrepliedReviews);
    const ratingTrend = calculateTrend(Math.round(averageRating * 10), Math.round(previousAverageRating * 10));
    const googleTrend = calculateTrend(googleReviews, previousGoogleReviews);
    const internalTrend = calculateTrend(internalReviews, previousInternalReviews);
    const internalNegativesTrend = calculateTrend(internalNegatives, previousInternalNegatives);
    
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
      positiveTrend,
      negativeTrend,
      responseRateTrend,
      replyTimeTrend,
      resolvedTrend,
      unrepliedTrend,
      ratingTrend,
      googleTrend,
      internalTrend,
      internalNegativesTrend,
      repliedReviews
    };
  }, [period]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showPeriodDropdown && !e.target.closest('.period-dropdown-container')) {
        setShowPeriodDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPeriodDropdown]);

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
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-600', hex: '#2563eb' },
      green: { bg: 'bg-green-50', text: 'text-green-600', icon: 'text-green-600', hex: '#16a34a' },
      red: { bg: 'bg-red-50', text: 'text-red-600', icon: 'text-red-600', hex: '#dc2626' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-600', icon: 'text-amber-600', hex: '#d97706' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'text-purple-600', hex: '#9333ea' }
    };

    // Get comparison period label
    const getComparisonLabel = () => {
      if (period === 'weekly') return 'vs Last Week';
      if (period === 'monthly') return 'vs Last Month';
      if (period === 'yearly') return 'vs Last Year';
      if (period === 'all') return 'vs Previous Period';
      return 'vs Previous Period';
    };

    const colors = colorMap[color];
    const displayValue = formatValue(value);
    const comparisonLabel = getComparisonLabel();

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
              <div className="h-5 w-12" style={{ width: '48px', height: '20px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={colors.hex}
                      strokeWidth={1.5}
                      dot={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Trend with Comparison Label Tooltip */}
            {trend !== undefined && (
              <div 
                className={`flex items-center gap-0.5 text-xs font-semibold group/trend cursor-help relative ${
                  trend >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
                title={comparisonLabel}
              >
                {trend >= 0 ? (
                  <TrendingUp size={10} />
                ) : (
                  <TrendingDown size={10} />
                )}
                {Math.abs(trend)}%
                {/* Tooltip on hover */}
                <div className="absolute bottom-full right-0 mb-1 px-2 py-1 text-xs bg-gray-900 text-white rounded whitespace-nowrap opacity-0 group-hover/trend:opacity-100 transition-opacity pointer-events-none z-10">
                  {comparisonLabel}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 p-5 w-full overflow-x-hidden overflow-y-visible">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 w-full flex-wrap gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900">Review Analytics</h2>
          <p className="text-sm text-gray-500 mt-0.5">Key metrics at a glance</p>
        </div>
        
        {/* Period Selector - Buttons on desktop, Dropdown on mobile */}
        {/* Desktop buttons */}
        <div className="hidden md:flex gap-2 bg-gray-100 p-1 rounded-lg flex-shrink-0">
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
          <button
            onClick={() => setPeriod('all')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              period === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            Lifetime
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className="md:hidden relative flex-shrink-0 period-dropdown-container">
          <button 
            onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all"
          >
            <span>{period.charAt(0).toUpperCase() + period.slice(1)}</span>
            <ChevronDown size={16} className={`transition-transform ${showPeriodDropdown ? 'rotate-180' : ''}`} />
          </button>
          {showPeriodDropdown && (
            <div className="absolute top-full right-0 mt-2 w-40 rounded-lg shadow-lg z-50 border border-gray-200 bg-white overflow-hidden">
              {['weekly', 'monthly', 'yearly', 'all'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setPeriod(option);
                    setShowPeriodDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    period === option 
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
              <div className="border-t border-gray-200">
                <button
                  onClick={() => {
                    setActiveTab(activeTab === 'advanced' ? 'metrics' : 'advanced');
                    setShowPeriodDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === 'advanced'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Advanced
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Advanced Toggle Button - Desktop only */}
        <button
          onClick={() => setActiveTab(activeTab === 'advanced' ? 'metrics' : 'advanced')}
          className={`hidden md:block px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap flex-shrink-0 ${
            activeTab === 'advanced'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:text-gray-900'
          }`}
        >
          Advanced
        </button>
      </div>

      {/* METRICS SECTION - Always Visible */}
      <div className="w-full">
        {/* Metrics Grid - 2 column on mobile, 6 column on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5 w-full">
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
          trend={metrics.positiveTrend}
          color="green"
          chartData={generateChartData(metrics.positiveReviews)}
        />
        <MetricCard 
          icon={ThumbsDown} 
          label="Negative" 
          value={metrics.negativeReviews}
          subtext={`${metrics.totalReviews > 0 ? Math.round((metrics.negativeReviews / metrics.totalReviews) * 100) : 0}%`}
          trend={metrics.negativeTrend}
          color="red"
          chartData={generateChartData(metrics.negativeReviews)}
        />
        <MetricCard 
          icon={Send} 
          label="Response Rate" 
          value={`${metrics.responseRate}%`}
          subtext={`${metrics.repliedReviews} replied`}
          trend={metrics.responseRateTrend}
          color="purple"
          chartData={generateChartData(metrics.responseRate)}
        />
        <MetricCard 
          icon={Clock} 
          label="Avg Reply Time" 
          value={`${metrics.avgReplyTime}h`}
          subtext="hours"
          trend={metrics.replyTimeTrend}
          color="blue"
          chartData={generateChartData(metrics.avgReplyTime)}
        />
        <MetricCard 
          icon={BarChart3} 
          label="Reviews/Week" 
          value={metrics.avgReviewsPerWeek}
          subtext="average"
          trend={metrics.trend}
          color="green"
          chartData={generateChartData(metrics.avgReviewsPerWeek)}
        />

        <MetricCard 
          icon={AlertCircle} 
          label="Unreplied" 
          value={metrics.unrepliedReviews}
          subtext={`${metrics.totalReviews > 0 ? Math.round((metrics.unrepliedReviews / metrics.totalReviews) * 100) : 0}%`}
          trend={metrics.unrepliedTrend}
          color="amber"
          chartData={generateChartData(metrics.unrepliedReviews)}
        />
        <MetricCard 
          icon={Star} 
          label="Avg Rating" 
          value={metrics.averageRating}
          subtext="out of 5"
          trend={metrics.ratingTrend}
          color="purple"
          chartData={generateChartData(metrics.averageRating * 10)}
        />
        <MetricCard 
          icon={Zap} 
          label="Resolved" 
          value={metrics.resolvedReviews}
          subtext={`${metrics.totalReviews > 0 ? Math.round((metrics.resolvedReviews / metrics.totalReviews) * 100) : 0}%`}
          trend={metrics.resolvedTrend}
          color="green"
          chartData={generateChartData(metrics.resolvedReviews)}
        />
        <MetricCard 
          icon={MessageSquare} 
          label="Google Reviews" 
          value={metrics.googleReviews}
          subtext={`${metrics.totalReviews > 0 ? Math.round((metrics.googleReviews / metrics.totalReviews) * 100) : 0}%`}
          trend={metrics.googleTrend}
          color="blue"
          chartData={generateChartData(metrics.googleReviews)}
        />
        <MetricCard 
          icon={Lock} 
          label="Internal Reviews" 
          value={metrics.internalReviews}
          subtext={`${metrics.totalReviews > 0 ? Math.round((metrics.internalReviews / metrics.totalReviews) * 100) : 0}%`}
          trend={metrics.internalTrend}
          color="purple"
          chartData={generateChartData(metrics.internalReviews)}
        />
        <MetricCard 
          icon={Flag} 
          label="Internal Negatives" 
          value={metrics.internalNegatives}
          subtext={`${metrics.totalReviews > 0 ? Math.round((metrics.internalNegatives / metrics.totalReviews) * 100) : 0}%`}
          trend={metrics.internalNegativesTrend}
          color="red"
          chartData={generateChartData(metrics.internalNegatives)}
        />
      </div>
      </div>

      {/* ADVANCED ANALYTICS - Expand/Collapse Below Metrics */}
      {activeTab === 'advanced' && (
      <div className="w-full mt-6">
        {/* Advanced Cards - 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        
        {/* Recent Critical Reviews */}
        <div className="relative overflow-hidden rounded-lg border border-gray-200 p-1.5 md:p-2 hover:shadow-md transition-all group flex flex-col justify-between h-full w-full">
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
        <div className="flex-1 min-w-[180px] relative overflow-hidden rounded-lg border border-gray-200 p-1.5 md:p-2 hover:shadow-md transition-all group flex flex-col justify-between h-full w-full">
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
        <div className="relative overflow-hidden rounded-lg border border-gray-200 p-1.5 md:p-2 hover:shadow-md transition-all group flex flex-col justify-between h-full w-full">
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

export default React.memo(QuickAnalyticsPanel);
