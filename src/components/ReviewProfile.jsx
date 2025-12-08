'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, Star, Tag, MessageSquare, BarChart3, Settings, Search, ChevronDown, Calendar, X, RefreshCw, Send, Heart } from 'lucide-react';

export default function ReviewProfile() {
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
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
      />
    ));
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setOpenDropdown(null);
  };

  const dropdownOptions = {
    rating: ['All', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
    sentiment: ['All', 'Positive', 'Neutral', 'Negative'],
    repliedStatus: ['All', 'Replied', 'Unreplied'],
    images: ['All', 'With Images', 'Without Images'],
    sortBy: ['Newest', 'Oldest', 'Highest Rating', 'Lowest Rating']
  };

  const openReplyModal = (review) => {
    setReplyModal({ open: true, review });
    setSelectedTone('professional');
  };

  const closeReplyModal = () => {
    setReplyModal({ open: false, review: null });
    setSelectedReply('');
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
          <Link href="/">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
              <LayoutGrid size={19} />
              <span>Overview</span>
            </button>
          </Link>
          <Link href="/review-dashboard">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
              <Star size={19} />
              <span>Google Reviews</span>
            </button>
          </Link>
          <Link href="/review-profile">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium bg-indigo-50 text-indigo-600 rounded-lg">
              <Tag size={19} />
              <span>Profile</span>
            </button>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
            <MessageSquare size={19} />
            <span>Negative Reviews</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
            <BarChart3 size={19} />
            <span>Analytics</span>
          </button>
          <Link href="/login">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all">
              <Settings size={19} />
              <span>Logout</span>
            </button>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-10 py-5 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-gray-500" />
            <button className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-gray-900">
              <span>December 8th, 2025</span>
              <ChevronDown size={18} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all">
              <Search size={20} className="text-gray-600" />
            </button>
            <Link href="/review-profile">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full cursor-pointer hover:opacity-80 transition-opacity"></div>
            </Link>
          </div>
        </div>

        <div className="p-10 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile & Recent Reviews</h1>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full mb-4"></div>
                  <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                  <p className="text-sm text-gray-500 mt-1">Business Owner</p>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-sm text-gray-900 mt-1">john@example.com</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                    <p className="text-sm text-gray-900 mt-1">New York, USA</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Member Since</p>
                    <p className="text-sm text-gray-900 mt-1">January 2024</p>
                  </div>
                </div>

                <button className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Right Column - Reviews */}
            <div className="col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Recent Reviews</h2>

                <div className="space-y-6">
                  {normalReviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                      <div className="flex items-start gap-4">
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
                  ))}
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

      {/* Reply Modal */}
      {replyModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Reply to Review</h2>
              <button onClick={closeReplyModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">{replyModal.review?.name}</h3>
                <p className="text-sm text-gray-700 mt-2">{replyModal.review?.comment}</p>
              </div>

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

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeReplyModal}
                  className="px-6 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Reply sent:', selectedReply);
                    alert('Reply sent successfully!');
                    closeReplyModal();
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 text-base font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
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
