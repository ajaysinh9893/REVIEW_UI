'use client';

import { useState, useEffect, useRef } from 'react';
import { Filter, X, SlidersHorizontal } from 'lucide-react';

export default function StickyFilterIcon({ 
  filters, 
  setFilters, 
  filterOptions, 
  clearAllFilters,
  getActiveFilters,
  searchBarRef
}) {
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if search bar is in top 20% of viewport
      if (searchBarRef?.current) {
        const rect = searchBarRef.current.getBoundingClientRect();
        // Show icon when search bar is in top 20% (viewport height * 0.2)
        const showThreshold = window.innerHeight * 0.2;
        setShowIcon(rect.top <= showThreshold);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchBarRef]);
  
  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  const activeFilterCount = getActiveFilters().length;

  return (
    <>
      {/* Sticky Filter Button - Mobile Only - Appears when search bar goes to top */}
      <div 
        className={`fixed bottom-6 right-6 z-50 lg:hidden transition-all duration-300 ease-in-out ${
          showIcon ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setShowFilterDrawer(true)}
          className="relative w-14 h-14 bg-indigo-600 rounded-full shadow-xl flex items-center justify-center text-white hover:bg-indigo-700 transition-all active:scale-95"
        >
          <Filter size={24} />
          
          {/* Active Filter Count Badge */}
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel Drawer */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          showFilterDrawer ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowFilterDrawer(false)}
        />

        {/* Drawer */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
            showFilterDrawer ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ maxHeight: '80vh' }}
        >
          {/* Drawer Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="text-indigo-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              {activeFilterCount > 0 && (
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                  {activeFilterCount} active
                </span>
              )}
            </div>
            <button
              onClick={() => setShowFilterDrawer(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Filter Options */}
          <div className="overflow-y-auto px-6 py-6" style={{ maxHeight: 'calc(80vh - 140px)' }}>
            
            {/* Filter Grid - 2 Columns */}
            <div className="grid grid-cols-2 gap-6">
              
              {/* Left Column */}
              <div>
                {/* Status Filter */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">Status</label>
                  <div className="space-y-1.5">
                    {filterOptions.status.map((option) => (
                      <label key={option} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          checked={filters.status === option}
                          onChange={() => handleFilterChange('status', option)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-2.5 text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">Rating</label>
                  <div className="space-y-1.5">
                    {filterOptions.rating.map((option) => (
                      <label key={option} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === option}
                          onChange={() => handleFilterChange('rating', option)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-2.5 text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Sentiment Filter */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">Sentiment</label>
                  <div className="space-y-1.5">
                    {filterOptions.sentiment.map((option) => (
                      <label key={option} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="sentiment"
                          checked={filters.sentiment === option}
                          onChange={() => handleFilterChange('sentiment', option)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-2.5 text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Time Range Filter */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">Time Range</label>
                  <div className="space-y-1.5">
                    {filterOptions.timeRange.map((option) => (
                      <label key={option} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="timeRange"
                          checked={filters.timeRange === option}
                          onChange={() => handleFilterChange('timeRange', option)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-2.5 text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-semibold"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-semibold shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
