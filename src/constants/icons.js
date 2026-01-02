/**
 * Centralized Icon Mapping System
 * This file defines consistent icons used across the entire application
 * Ensures UI consistency by using the same icon for the same concept everywhere
 */

export const ICON_MAP = {
  // Review Types & Status
  reviews: 'MessageSquare',
  totalReviews: 'MessageSquare',
  googleReviews: 'MessageSquare',
  internalReviews: 'Lock',
  
  // Sentiment
  positive: 'ThumbsUp',
  negative: 'ThumbsDown',
  neutral: 'Minus',
  internalNegatives: 'Flag',
  
  // Response & Resolution
  responseRate: 'Send',
  replied: 'CheckCircle',
  unreplied: 'AlertCircle',
  resolved: 'Zap',
  unresolved: 'Clock',
  
  // Time & Performance
  avgReplyTime: 'Clock',
  reviewsPerWeek: 'BarChart3',
  
  // Quality
  rating: 'Star',
  avgRating: 'Star',
  
  // Actions
  filter: 'Filter',
  search: 'Search',
  settings: 'Settings',
  
  // Other
  trend: 'TrendingUp',
  alert: 'AlertCircle'
};

/**
 * Get the icon name for a specific metric
 * @param {string} metricName - The name of the metric
 * @returns {string} - The icon name from lucide-react
 */
export const getIconForMetric = (metricName) => {
  return ICON_MAP[metricName] || 'MessageSquare';
};

/**
 * Icon-to-Component mappings (for reference when importing in components)
 * Import the actual components from lucide-react and use them with getIconForMetric()
 */
export const ICON_NAMES = {
  MessageSquare: 'MessageSquare',
  ThumbsUp: 'ThumbsUp',
  ThumbsDown: 'ThumbsDown',
  Clock: 'Clock',
  BarChart3: 'BarChart3',
  AlertCircle: 'AlertCircle',
  Eye: 'Eye',
  Star: 'Star',
  Zap: 'Zap',
  CheckCircle: 'CheckCircle',
  Send: 'Send',
  Minus: 'Minus',
  Globe: 'Globe',
  Lock: 'Lock',
  Flag: 'Flag',
  Filter: 'Filter',
  Search: 'Search',
  Settings: 'Settings',
  TrendingUp: 'TrendingUp',
  TrendingDown: 'TrendingDown'
};
