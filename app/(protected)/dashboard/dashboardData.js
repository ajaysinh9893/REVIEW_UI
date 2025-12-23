// Dashboard static data - extracted to reduce component bundle size

export const weekChartData = [
  { name: 'Mon', lastWeek: 12, thisWeek: 18 },
  { name: 'Tue', lastWeek: 15, thisWeek: 22 },
  { name: 'Wed', lastWeek: 10, thisWeek: 16 },
  { name: 'Thu', lastWeek: 18, thisWeek: 25 },
  { name: 'Fri', lastWeek: 22, thisWeek: 30 },
  { name: 'Sat', lastWeek: 20, thisWeek: 28 },
  { name: 'Sun', lastWeek: 14, thisWeek: 20 }
];

export const monthChartData = [
  { name: 'Week 1', lastMonth: 85, thisMonth: 95 },
  { name: 'Week 2', lastMonth: 92, thisMonth: 110 },
  { name: 'Week 3', lastMonth: 78, thisMonth: 105 },
  { name: 'Week 4', lastMonth: 88, thisMonth: 120 }
];

export const visibilityData = [
  { name: 'Mon', impressions: 1250, clicks: 85, calls: 12, directions: 28 },
  { name: 'Tue', impressions: 1380, clicks: 92, calls: 15, directions: 32 },
  { name: 'Wed', impressions: 1420, clicks: 88, calls: 11, directions: 25 },
  { name: 'Thu', impressions: 1560, clicks: 105, calls: 18, directions: 38 },
  { name: 'Fri', impressions: 1890, clicks: 128, calls: 22, directions: 45 },
  { name: 'Sat', impressions: 2100, clicks: 145, calls: 28, directions: 52 },
  { name: 'Sun', impressions: 1750, clicks: 112, calls: 19, directions: 41 }
];

export const positiveReviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    date: '2 days ago',
    comment: 'Absolutely fantastic service! The team was responsive, professional, and really understood our needs. Highly recommend!',
    sentiment: 'Positive',
    replied: true,
    resolved: true,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    date: '1 week ago',
    comment: 'Great experience! Everything was smooth from start to finish. The attention to detail was impressive.',
    sentiment: 'Positive',
    replied: true,
    resolved: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    rating: 4,
    date: '1 week ago',
    comment: 'Really impressed with the quality. Could use a bit more documentation, but overall excellent.',
    sentiment: 'Positive',
    replied: false,
    resolved: false,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
  },
  {
    id: 4,
    name: 'David Martinez',
    rating: 5,
    date: '10 days ago',
    comment: 'Outstanding! I\'ll definitely be back for more.',
    sentiment: 'Positive',
    replied: true,
    resolved: true,
    image: null
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Best service I\'ve used in years. Worth every penny!',
    sentiment: 'Positive',
    replied: true,
    resolved: true,
    image: null
  }
];

export const negativeReviews = [
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

export const positiveKeywords = [
  { name: 'Service', count: 120 },
  { name: 'Quality', count: 95 },
  { name: 'Support', count: 88 },
  { name: 'Value', count: 70 },
  { name: 'Friendly', count: 65 }
];

export const negativeKeywords = [
  { name: 'Slow', count: 45 },
  { name: 'Expensive', count: 38 },
  { name: 'Confusing', count: 32 },
  { name: 'Bugs', count: 28 },
  { name: 'Support', count: 22 }
];

export const alerts = [
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
    period: 'this week'
  }
];

export const kpiData = [
  {
    title: 'Total Reviews',
    value: '2,847',
    change: '+12%',
    changeColor: 'text-green-600',
    bgColor: 'bg-blue-50',
    icon: 'MessageSquare'
  },
  {
    title: 'Avg Rating',
    value: '4.8',
    change: '+0.2',
    changeColor: 'text-green-600',
    bgColor: 'bg-amber-50',
    icon: 'Star'
  },
  {
    title: 'Response Rate',
    value: '89%',
    change: '+5%',
    changeColor: 'text-green-600',
    bgColor: 'bg-purple-50',
    icon: 'CheckCircle'
  },
  {
    title: 'New Reviews',
    value: '156',
    change: '+8%',
    changeColor: 'text-green-600',
    bgColor: 'bg-pink-50',
    icon: 'TrendingUp'
  }
];

