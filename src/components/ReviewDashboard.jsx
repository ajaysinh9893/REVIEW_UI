'use client';

import { useState } from 'react';
import { LayoutGrid, Star, Tag, MessageSquare, BarChart3, Settings, Search, ChevronDown, Heart, TrendingUp, Calendar, X, RefreshCw, Send } from 'lucide-react';

export default function ReviewDashboard() {
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyModal, setReplyModal] = useState({ open: false, review: null });
  const [selectedTone, setSelectedTone] = useState('professional');
  const [selectedReply, setSelectedReply] = useState('');
  const [filters, setFilters] = useState({
    rating: 'Rating',
    sentiment: 'Sentiment',
    repliedStatus: 'Replied Status',
    images: 'Images',
    sortBy: 'Newest'
  });
  const [openDropdown, setOpenDropdown] = useState(null);

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
    },
    {
      id: 3,
      name: 'Diana Prince',
      rating: 5,
      date: '1 week ago',
      comment: 'Absolutely love the automated reply feature. It maintains a consistent brand voice across all platforms, which is crucial for our online reputation.',
      sentiment: 'Positive',
      replied: true,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
    },
    {
      id: 4,
      name: 'Eve Adams',
      rating: 3,
      date: '1 week ago',
      comment: 'The dashboard is comprehensive but can feel a bit overwhelming at times with so much data. A cleaner hierarchy or more customization options would be helpful.',
      sentiment: 'Neutral',
      replied: false,
      image: null
    },
    {
      id: 5,
      name: 'Frank White',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Fantastic service! My Google reviews have never been this organized and actionable. I highly recommend RepuScope AI for any business serious about reviews.',
      sentiment: 'Positive',
      replied: false,
      image: null
    },
    {
      id: 9,
      name: 'Sarah Martinez',
      rating: 5,
      date: '3 days ago',
      comment: 'The analytics dashboard is incredibly intuitive. I can see trends at a glance and make data-driven decisions quickly. The customer support team is also very responsive!',
      sentiment: 'Positive',
      replied: true,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
    },
    {
      id: 10,
      name: 'Michael Chen',
      rating: 4,
      date: '5 days ago',
      comment: 'Really impressed with the AI-powered sentiment analysis. It accurately categorizes reviews and saves me hours of manual work each week.',
      sentiment: 'Positive',
      replied: false,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
    },
    {
      id: 11,
      name: 'Jennifer Lopez',
      rating: 5,
      date: '1 week ago',
      comment: 'Our response time to reviews has improved by 300% since implementing RepuScope. The automated suggestions are spot-on and help maintain our brand voice consistently.',
      sentiment: 'Positive',
      replied: true,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
    },
    {
      id: 12,
      name: 'David Thompson',
      rating: 4,
      date: '1 week ago',
      comment: 'Good platform overall. The review aggregation from multiple sources is seamless. Would love to see more customization options for the dashboard widgets.',
      sentiment: 'Neutral',
      replied: false,
      image: null
    },
    {
      id: 13,
      name: 'Emily Watson',
      rating: 5,
      date: '2 weeks ago',
      comment: 'The bulk reply feature is a game changer! I can now respond to dozens of reviews in minutes while keeping each response personalized and meaningful.',
      sentiment: 'Positive',
      replied: true,
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'
    },
    {
      id: 14,
      name: 'Robert Anderson',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Outstanding tool for reputation management. The keyword tracking helps us identify what customers love most about our service. Highly recommended for any business!',
      sentiment: 'Positive',
      replied: false,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
    },
    {
      id: 15,
      name: 'Lisa Kim',
      rating: 4,
      date: '3 weeks ago',
      comment: 'Very solid review management system. The integration with Google Business Profile works flawlessly. Support team is knowledgeable and helpful.',
      sentiment: 'Positive',
      replied: true,
      image: null
    },
    {
      id: 16,
      name: 'James Wilson',
      rating: 5,
      date: '3 weeks ago',
      comment: 'Best investment we made this year! The ROI is clear - more positive reviews, faster response times, and better customer relationships overall.',
      sentiment: 'Positive',
      replied: false,
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400'
    },
    {
      id: 17,
      name: 'Amanda Rodriguez',
      rating: 3,
      date: '1 month ago',
      comment: 'Does what it promises but the learning curve is a bit steep. Once you get the hang of it though, it becomes quite powerful. More tutorial videos would help.',
      sentiment: 'Neutral',
      replied: true,
      image: null
    },
    {
      id: 18,
      name: 'Christopher Lee',
      rating: 5,
      date: '1 month ago',
      comment: 'The notification system ensures I never miss a review. Real-time alerts help me respond quickly to both positive and negative feedback. Excellent platform!',
      sentiment: 'Positive',
      replied: false,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
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
    },
    {
      id: 7,
      name: 'Grace Hopper',
      rating: 1,
      date: '1 week ago',
      comment: 'The latest update broke a critical feature. I am unable to access my reports and it is severely impacting our workflow.',
      sentiment: 'Negative',
      replied: false,
      resolved: false,
      image: null
    },
    {
      id: 8,
      name: 'Liam Miller',
      rating: 2,
      date: '2 weeks ago',
      comment: 'The user interface is quite confusing, especially for new users. It took a long time to figure out basic functionalities.',
      sentiment: 'Negative',
      replied: true,
      resolved: false,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
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

  // Filter reviews based on search and filters
  const getFilteredReviews = (reviews) => {
    return reviews.filter(review => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase());

      // Rating filter
      const matchesRating = filters.rating === 'Rating' || 
        filters.rating === 'All' ||
        (filters.rating === '5 Stars' && review.rating === 5) ||
        (filters.rating === '4 Stars' && review.rating === 4) ||
        (filters.rating === '3 Stars' && review.rating === 3) ||
        (filters.rating === '2 Stars' && review.rating === 2) ||
        (filters.rating === '1 Star' && review.rating === 1);

      // Sentiment filter
      const matchesSentiment = filters.sentiment === 'Sentiment' || 
        filters.sentiment === 'All' ||
        review.sentiment === filters.sentiment;

      // Replied status filter
      const matchesReplied = filters.repliedStatus === 'Replied Status' || 
        filters.repliedStatus === 'All' ||
        (filters.repliedStatus === 'Replied' && review.replied) ||
        (filters.repliedStatus === 'Unreplied' && !review.replied);

      // Images filter
      const matchesImages = filters.images === 'Images' || 
        filters.images === 'All' ||
        (filters.images === 'With Images' && review.image) ||
        (filters.images === 'Without Images' && !review.image);

      return matchesSearch && matchesRating && matchesSentiment && matchesReplied && matchesImages;
    });
  };

  const filteredNormalReviews = getFilteredReviews(normalReviews);
  const filteredNegativeReviews = getFilteredReviews(negativeReviews);

  const dropdownOptions = {
    rating: ['All', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
    sentiment: ['All', 'Positive', 'Neutral', 'Negative'],
    repliedStatus: ['All', 'Replied', 'Unreplied'],
    images: ['All', 'With Images', 'Without Images'],
    sortBy: ['Newest', 'Oldest', 'Highest Rating', 'Lowest Rating']
  };

  const toggleReviewSelection = (id) => {
    setSelectedReviews(prev =>
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const openReplyModal = (review) => {
    setReplyModal({ open: true, review });
    setSelectedTone('professional');
    setSelectedReply(getSuggestedReplies('professional')[0]);
  };

  const closeReplyModal = () => {
    setReplyModal({ open: false, review: null });
    setSelectedReply('');
  };

  const getSuggestedReplies = (tone) => {
    const replies = {
      professional: [
        "Dear reviewer, thank you for your valuable feedback regarding your experience with us. We appreciate you taking the time to share your thoughts.",
        "We are committed to providing excellent service and are reviewing your comments internally to ensure improvements.",
        "Your input is essential to us, and we look forward to serving you better in the future."
      ],
      friendly: [
        "Hey there! Thanks so much for taking the time to share your experience with us. We really appreciate your feedback!",
        "We're always looking to improve and your comments help us do just that. Thanks for being awesome!",
        "Your feedback means the world to us! We can't wait to serve you again soon. 😊"
      ],
      empathetic: [
        "Thank you for sharing your experience with us. We truly understand your concerns and want to make things right.",
        "We hear you, and we're genuinely sorry if we didn't meet your expectations. Your satisfaction is our priority.",
        "Your feedback touches our hearts. We're committed to ensuring every customer has a positive experience."
      ]
    };
    return replies[tone] || replies.professional;
  };

  const handleToneChange = (tone) => {
    setSelectedTone(tone);
    setSelectedReply(getSuggestedReplies(tone)[0]);
  };

  const handleSendReply = () => {
    console.log('Sending reply:', selectedReply);
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

  const Dropdown = ({ label, filterKey, options }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(filterKey)}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
      >
        {filters[filterKey]} <ChevronDown size={16} />
      </button>
      {openDropdown === filterKey && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleFilterChange(filterKey, option)}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-all ${
                index === 0 ? 'rounded-t-lg' : ''
              } ${index === options.length - 1 ? 'rounded-b-lg' : ''} ${
                filters[filterKey] === option ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center">
            <span className="text-indigo-600 text-base font-bold">R</span>
          </div>
          <span className="text-lg font-semibold text-indigo-600">RepuScope AI</span>
        </div>

        <nav className="space-y-1.5">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
            <LayoutGrid size={19} />
            <span>Overview</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium bg-indigo-50 text-indigo-600 rounded-lg">
            <Star size={19} />
            <span>Google Reviews</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
            <Tag size={19} />
            <span>Keywords</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
            <MessageSquare size={19} />
            <span>Negative Reviews</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
            <BarChart3 size={19} />
            <span>Analytics</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
            <Settings size={19} />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-10 py-5 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-gray-500" />
            <button className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-gray-900">
              <span>December 4th, 2025</span>
              <ChevronDown size={18} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all">
              <Search size={20} className="text-gray-600" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full"></div>
          </div>
        </div>

        <div className="p-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Reviews */}
            <div className="col-span-2 space-y-8">
              {/* Overall Rating Summary - Moved to Top */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Overall Rating Summary</h2>
                
                <div className="flex items-center gap-3 mb-6">
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
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">({item.count})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Normal Reviews with Review Controls Inside */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-gray-900">Normal Reviews</h2>
                  <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                    Filter <ChevronDown size={16} />
                  </button>
                </div>

                {/* Review Controls Inside Panel */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Review Controls</h3>
                  
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <div className="flex-1 min-w-[250px] relative">
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search reviews..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <Dropdown label="Rating" filterKey="rating" options={dropdownOptions.rating} />
                    <Dropdown label="Sentiment" filterKey="sentiment" options={dropdownOptions.sentiment} />
                    <Dropdown label="Replied Status" filterKey="repliedStatus" options={dropdownOptions.repliedStatus} />
                    <Dropdown label="Images" filterKey="images" options={dropdownOptions.images} />
                  </div>

                  <Dropdown label="Sort By" filterKey="sortBy" options={dropdownOptions.sortBy} />
                </div>

                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer" />
                  <span className="text-sm font-medium text-gray-600">Mark Replied</span>
                </div>

                <div className="space-y-6">
                  {filteredNormalReviews.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">No reviews match your filters</p>
                    </div>
                  ) : (
                    filteredNormalReviews.map((review, index) => (
                    <div key={review.id} className={`${index !== normalReviews.length - 1 ? 'pb-6 border-b border-gray-100' : ''}`}>
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={selectedReviews.includes(review.id)}
                          onChange={() => toggleReviewSelection(review.id)}
                          className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="text-base font-semibold text-gray-900">{review.name}</h3>
                              <div className="flex items-center gap-1 mt-1">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
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

                          <p className="text-sm text-gray-700 mb-3 leading-relaxed">{review.comment}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                review.sentiment === 'Positive' ? 'bg-green-100 text-green-700' :
                                review.sentiment === 'Neutral' ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {review.sentiment}
                              </span>
                              {review.replied && (
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                                  Replied ✓
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => openReplyModal(review)}
                                className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
                                Reply
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                                <Heart size={18} className="text-gray-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  )}
                </div>
              </div>

              {/* Negative Reviews */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-gray-900">Negative Reviews</h2>
                  <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                    Filter <ChevronDown size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-5 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer" />
                    <span className="text-sm font-medium text-gray-600">Mark Replied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer" />
                    <span className="text-sm font-medium text-gray-600">Mark Resolved</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {filteredNegativeReviews.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">No reviews match your filters</p>
                    </div>
                  ) : (
                    filteredNegativeReviews.map((review, index) => (
                    <div key={review.id} className={`${index !== negativeReviews.length - 1 ? 'pb-6 border-b border-gray-100' : ''}`}>
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={selectedReviews.includes(review.id)}
                          onChange={() => toggleReviewSelection(review.id)}
                          className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="text-base font-semibold text-gray-900">{review.name}</h3>
                              <div className="flex items-center gap-1 mt-1">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
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

                          <p className="text-sm text-gray-700 mb-3 leading-relaxed">{review.comment}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                                Negative
                              </span>
                              {review.replied && (
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                                  Replied ✓
                                </span>
                              )}
                              {!review.resolved && (
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                                  Unresolved
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => openReplyModal(review)}
                                className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
                                Reply
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                                <Heart size={18} className="text-gray-600" />
                              </button>
                              <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                                Resolve
                              </button>
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

            {/* Right Column - Metrics */}
            <div className="space-y-6">
              {/* Metrics Overview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Metrics Overview</h2>
                
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Reviews</p>
                    <p className="text-3xl font-bold text-gray-900">256</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                    <div className="flex items-center gap-2">
                      <p className="text-3xl font-bold text-gray-900">4.7</p>
                      <TrendingUp size={20} className="text-green-500" />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Monthly Review Trend</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-green-600">+5%</p>
                      <TrendingUp size={18} className="text-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Keywords - Positive */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Top Keywords</h2>
                
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-green-700 mb-3">Positive</h3>
                  <div className="space-y-2">
                    {positiveKeywords.map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-3 hover:bg-green-50 rounded-lg transition-all cursor-pointer border-l-2 border-green-500">
                        <span className="text-sm text-gray-700 font-medium">{keyword.name}</span>
                        <span className="text-sm font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">{keyword.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-red-700 mb-3">Negative</h3>
                  <div className="space-y-2">
                    {negativeKeywords.map((keyword, index) => (
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

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-10 py-6">
            © 2025 RepuScope AI. All rights reserved.
          </div>
        </div>
      </div>

      {/* AI Reply Assistant Modal */}
      {replyModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                AI Reply Assistant for Review ID: {replyModal.review?.id}
              </h2>
              <button 
                onClick={closeReplyModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {/* Review Preview */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3 mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{replyModal.review?.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(replyModal.review?.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">{replyModal.review?.comment}</p>
              </div>

              {/* Suggested Replies Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Suggested Replies</h3>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                    <RefreshCw size={16} />
                    Generate More
                  </button>
                </div>

                {/* Tone Selection */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => handleToneChange('professional')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      selectedTone === 'professional'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                    professional
                  </button>
                  <button
                    onClick={() => handleToneChange('friendly')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      selectedTone === 'friendly'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                    friendly
                  </button>
                  <button
                    onClick={() => handleToneChange('empathetic')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      selectedTone === 'empathetic'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                    empathetic
                  </button>
                </div>

                {/* Suggested Reply Options */}
                <div className="space-y-3">
                  {getSuggestedReplies(selectedTone).map((reply, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedReply === reply
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedReply(reply)}>
                      <div className="flex items-start justify-between">
                        <p className="text-sm text-gray-700 flex-1">{reply}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReply(reply);
                          }}
                          className="ml-3 px-3 py-1 text-xs font-medium text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-all">
                          Use this
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Reply Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Reply</h3>
                <textarea
                  value={selectedReply}
                  onChange={(e) => setSelectedReply(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Type your reply here..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeReplyModal}
                  className="px-6 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all border border-gray-300">
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  className="flex items-center gap-2 px-6 py-2.5 text-base font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm">
                  <Send size={18} />
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}