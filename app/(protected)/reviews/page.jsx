'use client';

import { useState, useEffect } from 'react';
import { Search, Star, X, ChevronDown, Filter, Calendar, MessageSquare, TrendingUp, MapPin, Tag, CheckCircle, Clock, SlidersHorizontal } from 'lucide-react';
import { usePrompt } from '@/src/components/usePrompt';
import QuickAnalyticsPanel from '@/src/components/QuickAnalyticsPanel';

export default function ReviewsPage() {
    const prompt = usePrompt();
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
    const [searchQuery, setSearchQuery] = useState('');
  const [replyModal, setReplyModal] = useState({ open: false, review: null });
  const [selectedReply, setSelectedReply] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const [filters, setFilters] = useState({
    status: 'All Status',
    rating: 'All Ratings',
    timeRange: 'All Time',
    replied: 'All',
    sentiment: 'All Sentiment',
    source: 'All Sources',
    keyword: '',
    category: 'All Categories',
    resolution: 'All'
  });

  const reviews = [
    {
      id: 1,
      name: 'Alice Johnson',
      rating: 5,
      date: '2024-12-19',
      dateDisplay: '2 days ago',
      comment: 'RepuScope AI has transformed how we manage our online presence. The sentiment analysis is spot on and the actionable insights are truly invaluable.',
      sentiment: 'Positive',
      replied: true,
      source: 'Google',
      location: 'New York, NY',
      category: 'Product',
      resolved: true,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
    },
    {
      id: 2,
      name: 'Bob Williams',
      rating: 4,
      date: '2024-12-18',
      dateDisplay: '3 days ago',
      comment: 'Great tool, though the keyword suggestions could be more granular. Still, a massive time-saver for filtering and responding to reviews efficiently.',
      sentiment: 'Neutral',
      replied: false,
      source: 'Yelp',
      location: 'Los Angeles, CA',
      category: 'Features',
      resolved: false,
      image: null
    },
    {
      id: 3,
      name: 'Diana Prince',
      rating: 5,
      date: '2024-12-14',
      dateDisplay: '1 week ago',
      comment: 'Absolutely love the automated reply feature. It maintains a consistent brand voice across all platforms, which is crucial for our online reputation.',
      sentiment: 'Positive',
      replied: true,
      source: 'Facebook',
      location: 'Chicago, IL',
      category: 'Service',
      resolved: true,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
    },
    {
      id: 4,
      name: 'Frank Miller',
      rating: 2,
      date: '2024-12-17',
      dateDisplay: '4 days ago',
      comment: 'The dashboard feels cluttered and unintuitive. Would appreciate better organization and a cleaner UI.',
      sentiment: 'Negative',
      replied: false,
      source: 'Google',
      location: 'San Francisco, CA',
      category: 'UX',
      resolved: false,
      image: null
    },
    {
      id: 5,
      name: 'Grace Lee',
      rating: 1,
      date: '2024-12-14',
      dateDisplay: '1 week ago',
      comment: 'Customer support was slow in responding to my queries. Expected faster resolution.',
      sentiment: 'Negative',
      replied: false,
      source: 'Trustpilot',
      location: 'Boston, MA',
      category: 'Support',
      resolved: false,
      image: null
    },
    {
      id: 6,
      name: 'Henry Chen',
      rating: 3,
      date: '2024-11-20',
      dateDisplay: '1 month ago',
      comment: 'Decent product but pricing could be more competitive. Looking at alternatives.',
      sentiment: 'Neutral',
      replied: true,
      source: 'Google',
      location: 'Seattle, WA',
      category: 'Pricing',
      resolved: true,
      image: null
    }
  ];

  const filterOptions = {
    status: ['All Status', 'Active', 'Archived'],
    rating: ['All Ratings', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
    timeRange: ['All Time', 'Today', 'Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'This Year'],
    replied: ['All', 'Replied', 'Unreplied'],
    sentiment: ['All Sentiment', 'Positive', 'Neutral', 'Negative'],
    source: ['All Sources', 'Google', 'Yelp', 'Facebook', 'Trustpilot', 'Other'],
    category: ['All Categories', 'Product', 'Features', 'Service', 'UX', 'Support', 'Pricing'],
    resolution: ['All', 'Resolved', 'Unresolved']
  };

  const getActiveFilters = () => {
    const active = [];
    if (filters.status !== 'All Status') active.push({ key: 'status', value: filters.status });
    if (filters.rating !== 'All Ratings') active.push({ key: 'rating', value: filters.rating });
    if (filters.timeRange !== 'All Time') active.push({ key: 'timeRange', value: filters.timeRange });
    if (filters.replied !== 'All') active.push({ key: 'replied', value: filters.replied });
    if (filters.sentiment !== 'All Sentiment') active.push({ key: 'sentiment', value: filters.sentiment });
    if (filters.source !== 'All Sources') active.push({ key: 'source', value: filters.source });
    if (filters.category !== 'All Categories') active.push({ key: 'category', value: filters.category });
    if (filters.resolution !== 'All') active.push({ key: 'resolution', value: filters.resolution });
    return active;
  };

  const clearAllFilters = () => {
    setFilters({
      status: 'All Status',
      rating: 'All Ratings',
      timeRange: 'All Time',
      replied: 'All',
      sentiment: 'All Sentiment',
      source: 'All Sources',
      keyword: '',
      category: 'All Categories',
      resolution: 'All'
    });
    setSearchQuery('');
  };

  const removeFilter = (key) => {
    const defaultValues = {
      status: 'All Status',
      rating: 'All Ratings',
      timeRange: 'All Time',
      replied: 'All',
      sentiment: 'All Sentiment',
      source: 'All Sources',
      category: 'All Categories',
      resolution: 'All'
    };
    setFilters({ ...filters, [key]: defaultValues[key] });
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = searchQuery === '' || 
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filters.status === 'All Status' || 
      (filters.status === 'Active' && !review.archived) ||
      (filters.status === 'Archived' && review.archived);
    
    const matchesRating = filters.rating === 'All Ratings' || 
      review.rating === parseInt(filters.rating);
    
    const matchesTimeRange = filters.timeRange === 'All Time' || (() => {
      const reviewDate = new Date(review.date);
      const now = new Date();
      const diffDays = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));
      
      if (filters.timeRange === 'Today') return diffDays === 0;
      if (filters.timeRange === 'Last 7 Days') return diffDays <= 7;
      if (filters.timeRange === 'Last 30 Days') return diffDays <= 30;
      if (filters.timeRange === 'Last 3 Months') return diffDays <= 90;
      if (filters.timeRange === 'This Year') return reviewDate.getFullYear() === now.getFullYear();
      return true;
    })();
    
    const matchesReplied = filters.replied === 'All' || 
      (filters.replied === 'Replied' && review.replied) ||
      (filters.replied === 'Unreplied' && !review.replied);
    const matchesSentiment = filters.sentiment === 'All Sentiment' || review.sentiment === filters.sentiment;
    const matchesSource = filters.source === 'All Sources' || review.source === filters.source;
    const matchesCategory = filters.category === 'All Categories' || review.category === filters.category;
    const matchesResolution = filters.resolution === 'All' || 
      (filters.resolution === 'Resolved' && review.resolved) ||
      (filters.resolution === 'Unresolved' && !review.resolved);
    
    return matchesSearch && matchesStatus && matchesRating && matchesTimeRange && 
           matchesReplied && matchesSentiment && matchesSource && 
           matchesCategory && matchesResolution;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
      />
    ));
  };

  const openReplyModal = (review) => {
    setReplyModal({ open: true, review });
    setSelectedReply('');
  };

  const closeReplyModal = () => {
    setReplyModal({ open: false, review: null });
    setSelectedReply('');
  };

  const handleReplySubmit = () => {
    if (!selectedReply.trim()) {
      prompt.showError('Empty Reply', 'Please write a reply before submitting.');
      return;
    }

    prompt.showLoading('Sending your reply...');
    setTimeout(() => {
      prompt.closePrompt();
      prompt.showSuccess('Reply Sent', 'Your reply has been published successfully.');
      console.log('Reply sent:', selectedReply);
      closeReplyModal();
    }, 1500);
  };

  const handleMarkResolved = (review) => {
    prompt.showConfirm(
      'Mark as Resolved?',
      `Mark "${review.name}&apos;s" review as resolved. This indicates you&apos;ve addressed their concern.`,
      () => {
        prompt.showLoading('Marking as resolved...');
        setTimeout(() => {
          prompt.closePrompt();
          prompt.showSuccess('Marked Resolved', 'This review has been marked as resolved.');
          console.log('Review marked as resolved:', review.id);
        }, 1200);
      },
      { confirmText: 'Mark Resolved', cancelText: 'Cancel', type: 'warning' }
    );
  };

  const FilterDropdown = ({ label, filterKey, options, icon: Icon }) => (
    <div className="relative">
      <button 
        onClick={() => setOpenDropdown(openDropdown === filterKey ? null : filterKey)}
        className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg hover:transition-all flex items-center justify-between gap-2 border ${
          'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {Icon && <Icon size={16} className={`flex-shrink-0 ${'text-gray-500'}`} />}
          <span className="truncate">{filters[filterKey]}</span>
        </div>
        <ChevronDown size={16} className={`flex-shrink-0 transition-transform ${openDropdown === filterKey ? 'rotate-180' : ''} ${'text-gray-500'}`} />
      </button>
      {openDropdown === filterKey && (
        <div className={`absolute top-full left-0 mt-2 w-full rounded-lg shadow-lg z-50 border ${
          'bg-white border-gray-200'
        }`}>
          <div className="max-h-64 overflow-y-auto">
            {options.map((option, idx) => (
              <button
                key={option}
                onClick={() => {
                  setFilters({ ...filters, [filterKey]: option });
                  setOpenDropdown(null);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${idx === 0 ? 'rounded-t-lg' : ''} ${idx === options.length - 1 ? 'rounded-b-lg' : ''} ${
                  filters[filterKey] === option 
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-700 hover:bg-indigo-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const activeFilters = getActiveFilters();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openDropdown && !e.target.closest('.relative')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="p-10 pr-24">
        <div className="max-w-7xl mx-auto">
          {/* Quick Analytics Panel - Top */}
          <div className="mb-8 w-full">
            <QuickAnalyticsPanel filteredReviews={filteredReviews} allReviews={reviews} />
          </div>

          {/* Main content */}
          <div className="grid grid-cols-12 gap-6">
              {/* Filter Panel - Left Side */}
              <div className="col-span-3">
                <div className={`rounded-xl border p-5 border-gray-200`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Filter size={20} className="text-indigo-600" />
                      <h2 className={`text-lg font-semibold ${'text-gray-900'}`}>Filters</h2>
                    </div>
                    {activeFilters.length > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Primary Filters */}
                  <div className={`space-y-3 pb-5 border-b ${'border-gray-200'}`}>
                    <div>
                      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide ${'text-gray-700'}`}>
                        Status
                      </label>
                      <FilterDropdown 
                        label="Status" 
                        filterKey="status" 
                        options={filterOptions.status}
                        icon={CheckCircle}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide ${'text-gray-700'}`}>
                        Rating
                      </label>
                      <FilterDropdown 
                        label="Rating" 
                        filterKey="rating" 
                        options={filterOptions.rating}
                        icon={Star}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide ${'text-gray-700'}`}>
                        Time Range
                      </label>
                      <FilterDropdown 
                        label="Time Range" 
                        filterKey="timeRange" 
                        options={filterOptions.timeRange}
                        icon={Calendar}
                      />
                    </div>
                  </div>

                  {/* Additional Filters */}
                  <div className={`space-y-3 pt-5 pb-5 border-b ${'border-gray-200'}`}>
                    <div>
                      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide ${'text-gray-700'}`}>
                        Replied
                      </label>
                      <FilterDropdown 
                        label="Replied" 
                        filterKey="replied" 
                        options={filterOptions.replied}
                        icon={CheckCircle}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide ${'text-gray-700'}`}>
                        Sentiment
                      </label>
                      <FilterDropdown 
                        label="Sentiment" 
                        filterKey="sentiment" 
                        options={filterOptions.sentiment}
                        icon={TrendingUp}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide ${'text-gray-700'}`}>
                        Source
                      </label>
                      <FilterDropdown 
                        label="Source" 
                        filterKey="source" 
                        options={filterOptions.source}
                        icon={MessageSquare}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide ${'text-gray-700'}`}>
                        Category
                      </label>
                      <FilterDropdown 
                        label="Category" 
                        filterKey="category" 
                        options={filterOptions.category}
                        icon={Tag}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide ${'text-gray-700'}`}>
                        Resolution
                      </label>
                      <FilterDropdown 
                        label="Resolution" 
                        filterKey="resolution" 
                        options={filterOptions.resolution}
                        icon={CheckCircle}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className={`mt-5 pt-5 border-t ${'border-gray-200'}`}>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className={'text-gray-600'}>Total Reviews</span>
                        <span className={`font-semibold ${'text-gray-900'}`}>{reviews.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={'text-gray-600'}>Filtered Results</span>
                        <span className="font-semibold text-indigo-600">{filteredReviews.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="col-span-9">
                {/* Search Bar */}
                <div className={`rounded-xl border p-4 mb-6 border-gray-200`}>
                  <div className="relative">
                    <Search size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 ${'text-gray-400'}`} />
                    <input
                      type="text"
                      placeholder="Search reviews by name, comment, or keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent border ${'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`}
                    />
                  </div>
                </div>

                {/* Active Filter Chips */}
                {activeFilters.length > 0 && (
                  <div className={`rounded-xl border p-4 mb-6 ${'bg-indigo-50 border-indigo-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-sm font-semibold ${'text-indigo-900'}`}>
                        Active Filters ({activeFilters.length})
                      </span>
                      <button
                        onClick={clearAllFilters}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeFilters.map((filter) => (
                        <div
                          key={filter.key}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 border text-sm font-medium rounded-lg ${'bg-white border-indigo-300 text-indigo-700'}`}
                        >
                          <span>{filter.value}</span>
                          <button
                            onClick={() => removeFilter(filter.key)}
                            className={`rounded-full p-0.5 transition-colors ${'hover:bg-indigo-100'}`}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {filteredReviews.length === 0 ? (
                    <div className={`rounded-xl shadow-sm border p-12 text-center ${'bg-white border-gray-200'}`}>
                      <MessageSquare size={48} className={`mx-auto mb-4 ${'text-gray-400'}`} />
                      <h3 className={`text-lg font-semibold mb-2 ${'text-gray-900'}`}>No reviews found</h3>
                      <p className={`mb-4 ${'text-gray-600'}`}>Try adjusting your filters or search query</p>
                      {activeFilters.length > 0 && (
                        <button
                          onClick={clearAllFilters}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  ) : (
                    filteredReviews.map((review) => (
                      <div key={review.id} className={`rounded-xl border p-6 hover:shadow-md transition-all border-gray-200`}>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {review.name.charAt(0)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className={`text-base font-semibold ${'text-gray-900'}`}>{review.name}</h3>
                                <div className="flex items-center gap-3 mt-1">
                                  <div className="flex items-center gap-1">
                                    {renderStars(review.rating)}
                                  </div>
                                  <span className={`text-xs ${'text-gray-500'}`}>•</span>
                                  <span className={`text-xs ${'text-gray-500'}`}>{review.dateDisplay}</span>
                                  <span className={`text-xs ${'text-gray-500'}`}>•</span>
                                  <span className={`text-xs ${'text-gray-500'}`}>{review.source}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                                {review.replied && (
                                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded flex items-center gap-1">
                                    <CheckCircle size={12} />
                                    Replied
                                  </span>
                                )}
                                <span className={`px-2 py-1 text-xs font-medium rounded ${
                                  review.sentiment === 'Positive' ? 'bg-green-100 text-green-700' :
                                  review.sentiment === 'Neutral' ? 'bg-amber-100 text-amber-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {review.sentiment}
                                </span>
                              </div>
                            </div>

                            {review.image && (
                              <div className="mb-3">
                                <img
                                  src={review.image}
                                  alt="Review"
                                  className="w-32 h-24 object-cover rounded-lg"
                                />
                              </div>
                            )}

                            <p className={`text-sm mb-4 leading-relaxed ${'text-gray-700'}`}>{review.comment}</p>

                            <div className="flex items-center justify-between">
                              <div className={`flex items-center gap-3 text-xs ${'text-gray-500'}`}>
                                <span className="flex items-center gap-1">
                                  <MapPin size={12} />
                                  {review.location}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Tag size={12} />
                                  {review.category}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                {!review.replied && (
                                  <button 
                                    onClick={() => openReplyModal(review)}
                                    className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
                                    Reply
                                  </button>
                                )}
                                {review.sentiment === 'Negative' && !review.resolved && (
                                  <button 
                                    onClick={() => handleMarkResolved(review)}
                                    className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                                    Mark Resolved
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reply Modal */}
        {replyModal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="rounded-xl w-full max-w-2xl max-h-[90vh] border border-gray-200 shadow-2xl overflow-hidden flex flex-col" style={{ backgroundColor: '#FAF9F5' }}>
          <div className="sticky top-0 border-b p-6 flex items-center justify-between border-gray-200 rounded-t-xl" style={{ backgroundColor: '#FAF9F5' }}>
            <h2 className={`text-xl font-bold ${'text-gray-900'}`}>Reply to Review</h2>
            <button onClick={closeReplyModal} className={`p-2 rounded-lg transition-colors ${'hover:bg-gray-100'}`}>
              <X size={20} className={'text-gray-600'} />
            </button>
          </div>

          <div className="p-6">
              <div className={`mb-6 p-4 rounded-lg border ${'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {replyModal.review?.name.charAt(0)}
                  </div>
                  <h3 className={`font-semibold ${'text-gray-900'}`}>{replyModal.review?.name}</h3>
                  <div className="flex items-center gap-1">
                    {renderStars(replyModal.review?.rating || 0)}
                  </div>
                </div>
                <p className={`text-sm leading-relaxed ${'text-gray-700'}`}>{replyModal.review?.comment}</p>
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-semibold mb-3 ${'text-gray-900'}`}>Your Reply</label>
                <textarea
                  value={selectedReply}
                  onChange={(e) => setSelectedReply(e.target.value)}
                  rows={6}
                  className={`w-full px-4 py-3 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none border ${'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`}
                  placeholder="Write a professional and helpful response..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeReplyModal}
                  className={`px-6 py-2.5 text-sm font-medium rounded-lg border transition-all ${'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'}`}>
                  Cancel
                </button>
                <button 
                  onClick={handleReplySubmit}
                  className="px-6 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md">
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prompt Renderer */}
      <prompt.PromptRenderer />
    </div>
  );
}
