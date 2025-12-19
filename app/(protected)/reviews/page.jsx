'use client';

import { useState } from 'react';
import { Search, Star, X } from 'lucide-react';

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    rating: 'Rating',
    sentiment: 'Sentiment',
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [replyModal, setReplyModal] = useState({ open: false, review: null });
  const [selectedReply, setSelectedReply] = useState('');

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
    }
  ];

  const negativeReviews = [
    {
      id: 4,
      name: 'Frank Miller',
      rating: 2,
      date: '4 days ago',
      comment: 'The dashboard feels cluttered and unintuitive. Would appreciate better organization and a cleaner UI.',
      sentiment: 'Negative',
      image: null
    },
    {
      id: 5,
      name: 'Grace Lee',
      rating: 1,
      date: '1 week ago',
      comment: 'Customer support was slow in responding to my queries. Expected faster resolution.',
      sentiment: 'Negative',
      image: null
    }
  ];

  const dropdownOptions = {
    rating: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    sentiment: ['Positive', 'Neutral', 'Negative']
  };

  const filteredNormalReviews = normalReviews.filter(review => {
    const matchesSearch = review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = filters.rating === 'Rating' || review.rating === parseInt(filters.rating);
    const matchesSentiment = filters.sentiment === 'Sentiment' || review.sentiment === filters.sentiment;
    return matchesSearch && matchesRating && matchesSentiment;
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

  const handleFilterChange = (filterKey, value) => {
    setFilters({ ...filters, [filterKey]: value });
    setOpenDropdown(null);
  };

  const Dropdown = ({ label, filterKey, options }) => (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(openDropdown === filterKey ? null : filterKey)}
        className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
      >
        {filters[filterKey]}
      </button>
      {openDropdown === filterKey && (
        <div className="absolute top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {options.map(option => (
            <button
              key={option}
              onClick={() => handleFilterChange(filterKey, option)}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-10">
      <div className="max-w-7xl mx-auto">

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Reviews</h2>

              <div className="mb-6 pb-6 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Review Controls</h3>
                <div className="flex items-center gap-3 flex-wrap">
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
                </div>
              </div>

              <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-6 space-y-6">
                {filteredNormalReviews.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No reviews match your filters</p>
                  </div>
                ) : (
                  filteredNormalReviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-100">
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

                        <p className="text-sm text-gray-700 mb-3">{review.comment}</p>

                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            review.sentiment === 'Positive' ? 'bg-green-100 text-green-700' :
                            review.sentiment === 'Neutral' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {review.sentiment}
                          </span>
                          <button 
                            onClick={() => openReplyModal(review)}
                            className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                            Reply
                          </button>
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
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Negative Reviews</h2>

              <div className="space-y-6">
                {negativeReviews.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No negative reviews</p>
                  </div>
                ) : (
                  negativeReviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-100">
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

                        <p className="text-sm text-gray-700 mb-3">{review.comment}</p>

                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                            {review.sentiment}
                          </span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => openReplyModal(review)}
                              className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                              Reply
                            </button>
                            <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
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
                  <button className="px-6 py-2.5 text-base font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
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
