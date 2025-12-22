'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutGrid, Star, Tag, MessageSquare, Settings, Search, ChevronDown, Heart, TrendingUp, Calendar, X, RefreshCw, Send, ArrowUp, ArrowDown, Users, AlertCircle, CheckCircle, Clock, Phone, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import KPIOverviewCard from '@/src/components/KPIOverviewCard';
import AlertSection from '@/src/components/AlertSection';

export default function Dashboard() {
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

  // Alerts data
  const alerts = [
    {
      id: '1',
      type: 'review',
      severity: 'critical',
      title: 'Negative reviews spike',
      description: '5 negative reviews in the last 2 days',
      changePercent: -25,
      period: 'last week'
    },
    {
      id: '2',
      type: 'calls',
      severity: 'warning',
      title: 'Call volume dropping',
      description: 'Phone calls down this week',
      changePercent: -15,
      period: 'last week'
    },
    {
      id: '3',
      type: 'visibility',
      severity: 'warning',
      title: 'Visibility decreased',
      description: 'Impressions lower than usual',
      changePercent: -10,
      period: 'last month'
    }
  ];

  // Alert icon mapping (needed by AlertSection)
  const alertIconMap = {
    review: AlertCircle,
    calls: Phone,
    visibility: Eye
  };

  // Alert route mapping
  const alertRouteMap = {
    review: '/reviews',
    calls: '/dashboard',
    visibility: '/visibility'
  };

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
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="p-10 max-w-7xl mx-auto pr-24">
          {/* Top Row - Visibility Snapshot & Overall Rating */}
          {/* Top Row - Visibility Snapshot, Overall Rating & Alerts */}
          <div className="grid grid-cols-12 gap-4 mb-8">
            {/* Visibility Snapshot - 50% width */}
            <div className="col-span-6 h-full">
              <KPIOverviewCard visibilityData={visibilityData} period="daily" />
            </div>
            
            {/* Overall Rating - 25% width */}
            <div className="col-span-3">
              <div className="rounded-xl border border-gray-200 p-5 h-full flex flex-col">
                <h2 className={`text-lg font-semibold mb-4 ${'text-gray-900'}`}>Overall Rating</h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`text-5xl font-bold ${'text-gray-900'}`}>4.7</div>
                  <Star size={32} className="fill-amber-400 text-amber-400" />
                </div>
                <p className={`text-base mb-4 ${'text-gray-500'}`}>based on 256 reviews</p>
                <div className="space-y-3 flex-1">
                  {[
                    { stars: 5, count: 180, percentage: 70 },
                    { stars: 4, count: 50, percentage: 20 },
                    { stars: 3, count: 10, percentage: 4 },
                    { stars: 2, count: 8, percentage: 3 },
                    { stars: 1, count: 8, percentage: 3 }
                  ].map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <span className={`text-base font-medium w-12 ${'text-gray-700'}`}>{item.stars}<span className="text-amber-500">★</span></span>
                      <div className={`flex-1 rounded-full h-2.5 overflow-hidden ${'bg-gray-200'}`}>
                        <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${item.percentage}%` }}></div>
                      </div>
                      <span className={`text-base w-12 text-right ${'text-gray-600'}`}>({item.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alerts Section - 25% width - NEW! */}
            <div className="col-span-3">
              <AlertSection alerts={alerts} />
            </div>
          </div>

          {/* Third Row - Review Trends, Metrics Overview & Top Keywords */}
          <div className="grid grid-cols-12 gap-4 mb-8">
            {/* Review Trends */}
            <div className="col-span-4">
              <div className="rounded-xl border border-gray-200 p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg font-semibold ${'text-gray-900'}`}>Review Trends</h2>
                  <div className={`flex gap-2 p-1 rounded-lg ${'bg-gray-100'}`}>
                    <button
                      onClick={() => setSelectedPeriod('week')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        selectedPeriod === 'week'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Weekly
                    </button>
                    <button
                      onClick={() => setSelectedPeriod('month')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        selectedPeriod === 'month'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={'#d1d5db'} 
                    />
                    <XAxis 
                      dataKey="name" 
                      stroke={'#4b5563'}
                      style={{ fontSize: '12px', fontWeight: '500' }}
                    />
                    <YAxis 
                      stroke={'#4b5563'}
                      style={{ fontSize: '12px', fontWeight: '500' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: `1px solid ${'#e5e7eb'}`,
                        borderRadius: '8px',
                        padding: '12px',
                        color: '#1f2937'
                      }}
                      cursor={{ stroke: '#d1d5db', strokeWidth: 1 }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px', color: '#1f2937' }}
                      iconType="line"
                    />
                    <Line
                      type="monotone"
                      dataKey={selectedPeriod === 'week' ? 'lastWeek' : 'lastMonth'}
                      stroke={'#94a3b8'}
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

            {/* Metrics Overview */}
            <div className="col-span-5">
              <div className="rounded-xl border border-gray-200 p-6 h-full flex flex-col">
                <h2 className={`text-lg font-semibold mb-4 ${'text-gray-900'}`}>Metrics Overview</h2>
                <div className="grid grid-cols-2 gap-3 flex-1">
                  {[
                    {
                      title: 'Total Reviews',
                      value: '256',
                      change: '+12.5%',
                      isPositive: true,
                      icon: <MessageSquare size={18} />,
                      color: 'text-blue-700',
                      bgColor: 'bg-blue-100',
                      subtitle: 'vs last period'
                    },
                    {
                      title: 'Average Rating',
                      value: '4.7',
                      change: '+0.3',
                      isPositive: true,
                      icon: <TrendingUp size={18} />,
                      color: 'text-red-700',
                      bgColor: 'bg-red-100',
                      subtitle: 'out of 5'
                    },
                    {
                      title: 'Response Rate',
                      value: '87.5%',
                      change: '+5.2%',
                      isPositive: true,
                      icon: <TrendingUp size={18} />,
                      color: 'text-yellow-700',
                      bgColor: 'bg-yellow-100',
                      subtitle: 'average response'
                    },
                    {
                      title: 'Replied Reviews',
                      value: '224',
                      change: '+8.3%',
                      isPositive: true,
                      icon: <CheckCircle size={18} />,
                      color: 'text-green-700',
                      bgColor: 'bg-green-100',
                      subtitle: 'of total reviews'
                    }
                  ].map((stat, index) => (
                    <div key={index} className={`${stat.bgColor} rounded-lg p-3 hover:shadow-md transition-all`}>
                      <div className="flex items-start justify-between mb-1">
                        <div className={`w-8 h-8 rounded flex items-center justify-center ${stat.color}`}>
                          {stat.icon}
                        </div>
                        <div className={`flex items-center gap-0.5 text-xs font-semibold ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.isPositive ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                          {stat.change}
                        </div>
                      </div>
                      <h3 className="text-sm font-medium text-gray-600 mb-0.5 uppercase tracking-wide">{stat.title}</h3>
                      <p className="text-lg font-bold text-gray-900 mb-0">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Keywords - aligned with Alerts */}
            <div className="col-span-3">
              <div className="rounded-xl border border-gray-200 p-4 h-full flex flex-col">
                <h2 className={`text-base font-semibold mb-3 ${'text-gray-900'}`}>Top Keywords</h2>
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-base font-semibold text-green-800 mb-2">Positive</h3>
                      <div className="space-y-1.5 mb-4">
                        {positiveKeywords.slice(0, 3).map((keyword, index) => (
                          <div key={index} className="flex items-center justify-between py-1.5 px-2 hover:bg-green-100 rounded-lg transition-all cursor-pointer border-l-2 border-green-700">
                            <span className="text-sm text-gray-700 font-medium">{keyword.name}</span>
                            <span className="text-sm font-semibold text-green-800 bg-green-200 px-2 py-0.5 rounded-full">{keyword.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-red-800 mb-2">Negative</h3>
                      <div className="space-y-1.5">
                        {negativeKeywords.slice(0, 3).map((keyword, index) => (
                          <div key={index} className="flex items-center justify-between py-1.5 px-2 hover:bg-red-100 rounded-lg transition-all cursor-pointer border-l-2 border-red-700">
                            <span className="text-sm text-gray-700 font-medium">{keyword.name}</span>
                            <span className="text-sm font-semibold text-red-800 bg-red-200 px-2 py-0.5 rounded-full">{keyword.count}</span>
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
    </div>
  );
}
