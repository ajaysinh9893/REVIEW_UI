'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, Star, Tag, MessageSquare, Settings, Search, ChevronDown, Heart, TrendingUp, Calendar, X, RefreshCw, Send, ArrowUp, ArrowDown, Users, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from '@/src/components/Sidebar';
import Header from '@/src/components/Header';
import KPIOverviewCard from '@/src/components/KPIOverviewCard';

export default function Dashboard() {
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyModal, setReplyModal] = useState({ open: false, review: null });
  const [selectedTone, setSelectedTone] = useState('professional');
  const [selectedReply, setSelectedReply] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [filters, setFilters] = useState({
    rating: 'Rating',
    sentiment: 'Sentiment',
    repliedStatus: 'Replied Status',
    images: 'Images',
    sortBy: 'Newest'
  });
  const [openDropdown, setOpenDropdown] = useState(null);

  // Visibility data for KPI snapshot
  const visibilityData = [
    { name: 'Mon', impressions: 1250, clicks: 85, calls: 12, directions: 28 },
    { name: 'Tue', impressions: 1380, clicks: 92, calls: 15, directions: 32 },
    { name: 'Wed', impressions: 1420, clicks: 88, calls: 11, directions: 25 },
    { name: 'Thu', impressions: 1560, clicks: 105, calls: 18, directions: 38 },
    { name: 'Fri', impressions: 1890, clicks: 128, calls: 22, directions: 45 },
    { name: 'Sat', impressions: 2100, clicks: 145, calls: 28, directions: 52 },
    { name: 'Sun', impressions: 1750, clicks: 112, calls: 19, directions: 41 }
  ];

  // Chart data
  const weekChartData = [
    { name: 'Mon', lastWeek: 12, thisWeek: 18 },
    { name: 'Tue', lastWeek: 15, thisWeek: 22 },
    { name: 'Wed', lastWeek: 10, thisWeek: 16 },
    { name: 'Thu', lastWeek: 18, thisWeek: 25 },
    { name: 'Fri', lastWeek: 22, thisWeek: 30 },
    { name: 'Sat', lastWeek: 20, thisWeek: 28 },
    { name: 'Sun', lastWeek: 14, thisWeek: 20 }
  ];

  const monthChartData = [
    { name: 'Week 1', lastMonth: 85, thisMonth: 95 },
    { name: 'Week 2', lastMonth: 92, thisMonth: 110 },
    { name: 'Week 3', lastMonth: 78, thisMonth: 105 },
    { name: 'Week 4', lastMonth: 88, thisMonth: 120 }
  ];

  const chartData = selectedPeriod === 'week' ? weekChartData : monthChartData;

  const normalReviews = [
    {
      id: 1,
      name: 'Alice Johnson',
      rating: 5,
      date: '2 days ago',
      comment: 'RepuScope AI has transformed how we manage our online presence. The sentiment analysis is spot on and the actionable insights are truly invaluable.',
      sentiment: 'Positive',
      replied: true,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
    },
    {
      id: 2,
      name: 'Bob Williams',
      rating: 4,
      date: '3 days ago',
      comment: 'Great tool, though the keyword suggestions could be more granular. Still, a massive time-saver for filtering and responding to reviews efficiently.',
      sentiment: 'Neutral',
      replied: false,
      image: null
    }
  ];

  const negativeReviews = [
    {
      id: 6,
      name: 'Charlie Brown',
      rating: 2,
      date: '5 days ago',
      comment: 'Had some issues with integration initially. Customer support was quick, but it cost me a day of work to get everything up and running smoothly.',
      sentiment: 'Negative',
      replied: false,
      resolved: false,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
    }
  ];

  const positiveKeywords = [
    { name: 'Service', count: 120 },
    { name: 'Quality', count: 95 },
    { name: 'Support', count: 88 },
    { name: 'Value', count: 70 },
    { name: 'Friendly', count: 65 }
  ];

  const negativeKeywords = [
    { name: 'Slow', count: 45 },
    { name: 'Expensive', count: 38 },
    { name: 'Confusing', count: 32 },
    { name: 'Bugs', count: 28 },
    { name: 'Support', count: 22 }
  ];

  const handleSendReply = () => {
    alert('Reply sent successfully!');
    closeReplyModal();
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
      />
    ));
  };

  const closeReplyModal = () => {
    setReplyModal({ open: false, review: null });
    setSelectedReply('');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      {/* Main Content */}
      <div className="ml-72 overflow-auto">
        <Header />

        <div className="p-10 max-w-7xl mx-auto">
          {/* Top Row - Visibility Snapshot & Overall Rating */}
          {/* Top Row - Visibility Snapshot & Overall Rating */}
<div className="grid grid-cols-12 gap-8 mb-8">
  {/* Visibility Snapshot - 70% width */}
  <div className="col-span-8">
    <KPIOverviewCard visibilityData={visibilityData} period="daily" />
  </div>
  
  {/* Overall Rating - 30% width */}
  <div className="col-span-4">
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Rating Summary</h2>
      <div className="flex items-center gap-3 mb-4">
        <div className="text-5xl font-bold text-gray-900">4.7</div>
        <Star size={32} className="fill-amber-400 text-amber-400" />
        <span className="text-sm text-gray-500 mt-2">based on 256 reviews</span>
      </div>
      <div className="space-y-3">
        {[
          { stars: 5, count: 180, percentage: 70 },
          { stars: 4, count: 50, percentage: 20 },
          { stars: 3, count: 10, percentage: 4 },
          { stars: 2, count: 8, percentage: 3 },
          { stars: 1, count: 8, percentage: 3 }
        ].map((item) => (
          <div key={item.stars} className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 w-12">{item.stars} Star</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${item.percentage}%` }}></div>
            </div>
            <span className="text-sm text-gray-600 w-12 text-right">({item.count})</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

          {/* Second Row - Review Trends & Metrics Overview */}
          <div className="grid grid-cols-12 gap-8 mb-8">
            {/* Review Trends - 30% width */}
            <div className="col-span-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Review Trends</h2>
                  <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setSelectedPeriod('week')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        selectedPeriod === 'week'
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Weekly
                    </button>
                    <button
                      onClick={() => setSelectedPeriod('month')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        selectedPeriod === 'month'
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
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
                      dataKey={selectedPeriod === 'week' ? 'lastWeek' : 'lastMonth'}
                      stroke="#94a3b8"
                      strokeWidth={3}
                      name={selectedPeriod === 'week' ? 'Last Week' : 'Last Month'}
                      dot={{ fill: '#94a3b8', r: 5 }}
                      activeDot={{ r: 7, fill: '#94a3b8' }}
                    />
                    <Line
                      type="monotone"
                      dataKey={selectedPeriod === 'week' ? 'thisWeek' : 'thisMonth'}
                      stroke="#6366f1"
                      strokeWidth={3}
                      name={selectedPeriod === 'week' ? 'This Week' : 'This Month'}
                      dot={{ fill: '#6366f1', r: 5 }}
                      activeDot={{ r: 7, fill: '#6366f1' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Metrics Overview - 70% width */}
            <div className="col-span-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Metrics Overview</h2>
                <div className="grid grid-cols-4 gap-3 flex-1">
                  {[
                    {
                      title: 'Total Reviews',
                      value: '256',
                      change: '+12.5%',
                      isPositive: true,
                      icon: <MessageSquare size={24} />,
                      color: 'from-blue-500 to-blue-600',
                      subtitle: 'vs last period'
                    },
                    {
                      title: 'Average Rating',
                      value: '4.7',
                      change: '+0.3',
                      isPositive: true,
                      icon: <TrendingUp size={24} />,
                      color: 'from-green-500 to-emerald-600',
                      subtitle: 'out of 5'
                    },
                    {
                      title: 'Response Rate',
                      value: '87.5%',
                      change: '+5.2%',
                      isPositive: true,
                      icon: <TrendingUp size={24} />,
                      color: 'from-pink-500 to-rose-600',
                      subtitle: 'average response'
                    },
                    {
                      title: 'Replied Reviews',
                      value: '224',
                      change: '+8.3%',
                      isPositive: true,
                      icon: <CheckCircle size={24} />,
                      color: 'from-purple-500 to-indigo-600',
                      subtitle: 'of total reviews'
                    }
                  ].map((stat, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 p-3 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                          {stat.icon}
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-semibold ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                          {stat.change}
                        </div>
                      </div>
                      <h3 className="text-xs font-medium text-gray-600 mb-0.5 uppercase tracking-wide">{stat.title}</h3>
                      <p className="text-xl font-bold text-gray-900 mb-0.5">{stat.value}</p>
                      {stat.subtitle && <p className="text-xs text-gray-500">{stat.subtitle}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Keywords */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Keywords</h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-green-700 mb-4">Positive</h3>
                  <div className="space-y-2">
                    {positiveKeywords.slice(0, 3).map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-3 hover:bg-green-50 rounded-lg transition-all cursor-pointer border-l-2 border-green-500">
                        <span className="text-sm text-gray-700 font-medium">{keyword.name}</span>
                        <span className="text-sm font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">{keyword.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-red-700 mb-4">Negative</h3>
                  <div className="space-y-2">
                    {negativeKeywords.slice(0, 3).map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-3 hover:bg-red-50 rounded-lg transition-all cursor-pointer border-l-2 border-red-500">
                        <span className="text-sm text-gray-700 font-medium">{keyword.name}</span>
                        <span className="text-sm font-semibold text-red-700 bg-red-100 px-2.5 py-1 rounded-full">{keyword.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
