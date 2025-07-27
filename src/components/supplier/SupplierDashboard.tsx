import React from 'react';
import { Package, Users, TrendingUp, DollarSign, Bell, Plus } from 'lucide-react';
import { mockOrders, mockTrustCircles } from '../../data/mockData';
import NotificationDropdown from '../NotificationDropdown';
import { useState } from 'react';

export default function SupplierDashboard() {
  const [showNotifications, setShowNotifications] = useState(false);

  const supplierOrders = mockOrders; // In real app, filter by supplier
  const totalRevenue = supplierOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  const stats = [
    {
      label: 'Active Orders',
      value: supplierOrders.length,
      icon: Package,
      color: 'bg-blue-100 text-blue-700',
      change: '+3 today'
    },
    {
      label: 'Trust Circles',
      value: mockTrustCircles.length,
      icon: Users,
      color: 'bg-green-100 text-green-700',
      change: '+2 this week'
    },
    {
      label: 'Revenue (MTD)',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-orange-100 text-orange-700',
      change: '+15% vs last month'
    },
    {
      label: 'Avg Order Value',
      value: `$${Math.round(totalRevenue / supplierOrders.length)}`,
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-700',
      change: '+8% this month'
    }
  ];

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    console.log('Navigate to notifications page');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supplier Dashboard</h1>
          <p className="text-gray-600">Manage your orders and connect with vendor circles</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 sm:p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors touch-manipulation"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <NotificationDropdown
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
              onViewAll={handleViewAllNotifications}
            />
          </div>
          <button className="flex items-center gap-2 bg-green-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors touch-manipulation">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Product</span>
            <span className="sm:hidden">Product</span>
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

      {/* Recent Orders & Trust Circles */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {supplierOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Order #{order.id.slice(-6)}</h4>
                  <p className="text-sm text-gray-600">
                    {order.items.length} items • {order.participants.length} vendors
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${order.totalAmount}</p>
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

        {/* Active Trust Circles */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Trust Circles</h3>
          <div className="space-y-3">
            {mockTrustCircles.map((circle) => (
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
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
            <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Update Inventory</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">View Circle Requests</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors">
            <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Set Bulk Pricing</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors">
            <DollarSign className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Payment Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
}