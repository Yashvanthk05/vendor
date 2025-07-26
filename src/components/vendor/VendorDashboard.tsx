import React, { useState } from 'react';
import { TrendingUp, Users, ShoppingCart, Star, Plus, Bell } from 'lucide-react';
import { mockTrustCircles, mockOrders, currentUser } from '../../data/mockData';
import AIRecommendations from '../AIRecommendations';

export default function VendorDashboard() {
  const [showNotifications, setShowNotifications] = useState(false);

  const userTrustCircles = mockTrustCircles.filter(tc => 
    tc.members.includes(currentUser.id)
  );

  const userOrders = mockOrders.filter(order => 
    order.participants.includes(currentUser.id)
  );

  const stats = [
    {
      label: 'Trust Circles',
      value: userTrustCircles.length,
      icon: Users,
      color: 'bg-blue-100 text-blue-700',
      change: '+2 this month'
    },
    {
      label: 'Active Orders',
      value: userOrders.length,
      icon: ShoppingCart,
      color: 'bg-green-100 text-green-700',
      change: '+5 this week'
    },
    {
      label: 'Total Savings',
      value: '$1,247',
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-700',
      change: '+18% vs last month'
    },
    {
      label: 'Vendor Rating',
      value: currentUser.rating,
      icon: Star,
      color: 'bg-yellow-100 text-yellow-700',
      change: '+0.2 this month'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser.name}</h1>
          <p className="text-gray-600">{currentUser.businessName}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Circle</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <AIRecommendations />

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Active Trust Circles */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Trust Circles</h3>
          <div className="space-y-3">
            {userTrustCircles.map((circle) => (
              <div key={circle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{circle.name}</h4>
                  <p className="text-sm text-gray-600">{circle.members.length} members</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">{circle.totalOrders} orders</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {userOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Order #{order.id.slice(-6)}</h4>
                  <p className="text-sm text-gray-600">
                    {order.items.length} items • ${order.totalAmount}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}