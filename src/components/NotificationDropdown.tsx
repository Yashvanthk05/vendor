import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, Clock, Users, ShoppingCart, Star, ChevronRight } from 'lucide-react';

interface Notification {
  id: string;
  type: 'order' | 'circle' | 'system' | 'promotion';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onViewAll: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'order',
    title: 'Order Update',
    message: 'Your order #o1 has been shipped and will arrive tomorrow',
    timestamp: '2024-12-20T14:30:00Z',
    read: false
  },
  {
    id: 'n2',
    type: 'circle',
    title: 'New Circle Invitation',
    message: 'You\'ve been invited to join "Asian Cuisine Circle"',
    timestamp: '2024-12-20T12:15:00Z',
    read: false
  },
  {
    id: 'n3',
    type: 'system',
    title: 'AI Recommendation',
    message: 'New supplier matches found for your area with 15% savings',
    timestamp: '2024-12-20T10:00:00Z',
    read: true
  },
  {
    id: 'n4',
    type: 'promotion',
    title: 'Special Offer',
    message: 'Get 20% off bulk orders this week from Fresh Foods Inc',
    timestamp: '2024-12-19T16:45:00Z',
    read: true
  }
];

export default function NotificationDropdown({ isOpen, onClose, onViewAll }: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="w-4 h-4" />;
      case 'circle':
        return <Users className="w-4 h-4" />;
      case 'system':
        return <Star className="w-4 h-4" />;
      case 'promotion':
        return <Bell className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'text-blue-600 bg-blue-100';
      case 'circle':
        return 'text-green-600 bg-green-100';
      case 'system':
        return 'text-purple-600 bg-purple-100';
      case 'promotion':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-64 overflow-y-auto">
        {mockNotifications.slice(0, 4).map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
              !notification.read ? 'bg-blue-50/30' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className={`font-medium text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notification.title}
                  </h4>
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 bg-gray-50">
        <button
          onClick={onViewAll}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm"
        >
          View All Notifications
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}