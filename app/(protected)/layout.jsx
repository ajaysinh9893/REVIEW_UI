'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/src/components/Sidebar';
import { Bell, X, Trash2, CheckCircle, Archive } from 'lucide-react';

export default function ProtectedLayout({ children }) {
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Review Received',
      message: 'You received a new review from John Smith',
      time: '5 minutes ago',
      type: 'review',
      read: false
    },
    {
      id: 2,
      title: 'Report Generated',
      message: 'Your monthly report is ready for download',
      time: '2 hours ago',
      type: 'report',
      read: false
    },
    {
      id: 3,
      title: 'Profile Update',
      message: 'Your profile information has been updated',
      time: '1 day ago',
      type: 'profile',
      read: true
    },
    {
      id: 4,
      title: 'Subscription Renewal',
      message: 'Your subscription will renew in 3 days',
      time: '2 days ago',
      type: 'subscription',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'review':
        return '📝';
      case 'report':
        return '📊';
      case 'profile':
        return '👤';
      case 'subscription':
        return '💳';
      default:
        return '🔔';
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col md:flex-row" style={{ backgroundColor: '#FAF9F5' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col relative w-full md:ml-72">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          {/* Notification Bell Icon */}
          <div className={`fixed top-4 right-4 md:top-8 md:right-4 z-30 transition-opacity duration-300 ${
            showAllNotifications ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            <button 
              onClick={() => setShowAllNotifications(!showAllNotifications)}
              className="relative p-2 md:p-2.5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:scale-105 transition-all"
            >
              <Bell size={20} className="md:w-6 md:h-6 text-indigo-600" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              )}
            </button>
          </div>
          <div className="flex-1 overflow-auto w-full">
            {children}
          </div>
        </div>

        {/* Overlay Backdrop */}
        {showAllNotifications && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={() => setShowAllNotifications(false)}
          />
        )}

        {/* Notifications Sidebar - Fixed Overlay */}
        {showAllNotifications && (
        <div className={`fixed top-0 right-0 h-screen w-72 bg-white border-l border-gray-200 flex flex-col overflow-hidden transition-all duration-500 ease-in-out z-50`}
        style={{
          boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.1)'
        }}>
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Notifications</h2>
                <p className="text-indigo-100 text-sm mt-1">{notifications.length} total notifications</p>
              </div>
              <button 
                onClick={() => setShowAllNotifications(false)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Filter/Sort Options */}
            <div className="border-b border-gray-200 px-6 py-3 flex gap-2">
              <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium hover:bg-indigo-100">
                All ({notifications.length})
              </button>
              <button className="px-3 py-1.5 text-gray-600 rounded-full text-xs font-medium hover:bg-gray-100">
                Unread ({unreadCount})
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center h-full">
                  <Bell size={48} className="opacity-30 mb-4" />
                  <p className="font-medium">No notifications</p>
                  <p className="text-xs mt-2">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-6 hover:bg-gray-50 transition-all cursor-pointer border-l-4 ${
                        !notification.read 
                          ? 'bg-blue-50 border-l-indigo-600' 
                          : 'border-l-transparent'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="text-2xl flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-sm">
                                {notification.title}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-2.5">
                                {notification.time}
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-3">
                            {!notification.read && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkAsRead(notification.id);
                                }}
                                className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100 transition-all font-medium"
                              >
                                <CheckCircle size={14} />
                                Mark as read
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteNotification(notification.id);
                              }}
                              className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 transition-all font-medium"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {notifications.length > 0 && (
              <div className="border-t border-gray-200 p-4 bg-gray-50 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium text-sm">
                  <Archive size={16} />
                  Archive All
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all font-medium text-sm">
                  <Trash2 size={16} />
                  Clear All
                </button>
              </div>
            )}
        </div>
        )}
      </div>
    </div>
  );
}