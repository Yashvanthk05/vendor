// pages/analytics.js or components/Analytics.js
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, 
  Package, Star, Clock, Calendar, Filter, Download, RefreshCw,
  Eye, MessageCircle, Heart, Share2
} from 'lucide-react';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isLoading, setIsLoading] = useState(false);

  // Sample data - replace with your API calls
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalRevenue: 12470,
      totalOrders: 156,
      avgOrderValue: 79.94,
      vendorRating: 4.8,
      revenueGrowth: 18.2,
      ordersGrowth: 12.5,
      ratingGrowth: 0.2,
      avgValueGrowth: 5.1
    },
    revenueData: [
      { date: '2024-01-20', revenue: 1200, orders: 24 },
      { date: '2024-01-21', revenue: 1800, orders: 32 },
      { date: '2024-01-22', revenue: 1600, orders: 28 },
      { date: '2024-01-23', revenue: 2200, orders: 35 },
      { date: '2024-01-24', revenue: 1900, orders: 31 },
      { date: '2024-01-25', revenue: 2400, orders: 38 },
      { date: '2024-01-26', revenue: 2100, orders: 34 }
    ],
    categoryData: [
      { name: 'Fresh Produce', value: 35, revenue: 4364.5 },
      { name: 'Dairy Products', value: 25, revenue: 3117.5 },
      { name: 'Meat & Poultry', value: 20, revenue: 2494 },
      { name: 'Beverages', value: 12, revenue: 1496.4 },
      { name: 'Others', value: 8, revenue: 997.6 }
    ],
    topProducts: [
      { name: 'Organic Apples', sales: 124, revenue: 496, growth: 15.2 },
      { name: 'Fresh Milk', sales: 98, revenue: 294, growth: 8.7 },
      { name: 'Chicken Breast', sales: 76, revenue: 380, growth: 22.1 },
      { name: 'Orange Juice', sales: 65, revenue: 195, growth: -3.2 },
      { name: 'Whole Wheat Bread', sales: 54, revenue: 162, growth: 12.8 }
    ],
    customerInsights: [
      { metric: 'New Customers', value: 34, change: 21.4 },
      { metric: 'Returning Customers', value: 89, change: 8.9 },
      { metric: 'Customer Retention', value: 72.3, change: 5.2 },
      { metric: 'Avg Session Duration', value: '4m 32s', change: 12.1 }
    ]
  });

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const StatCard = ({ title, value, change, icon: Icon, prefix = '', suffix = '' }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          <div className="flex items-center mt-2">
            {change > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
        <div className="p-3 bg-indigo-50 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'Revenue' ? '$' : ''}{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm text-gray-600 mt-1">Track your business performance and insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button 
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={analyticsData.overview.totalRevenue}
            change={analyticsData.overview.revenueGrowth}
            icon={DollarSign}
            prefix="$"
          />
          <StatCard
            title="Total Orders"
            value={analyticsData.overview.totalOrders}
            change={analyticsData.overview.ordersGrowth}
            icon={ShoppingCart}
          />
          <StatCard
            title="Avg Order Value"
            value={analyticsData.overview.avgOrderValue}
            change={analyticsData.overview.avgValueGrowth}
            icon={TrendingUp}
            prefix="$"
          />
          <StatCard
            title="Vendor Rating"
            value={analyticsData.overview.vendorRating}
            change={analyticsData.overview.ratingGrowth}
            icon={Star}
            suffix="/5"
          />
        </div>

        {/* Revenue & Orders Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue & Orders Trend</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedMetric('revenue')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    selectedMetric === 'revenue' 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setSelectedMetric('orders')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    selectedMetric === 'orders' 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Orders
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}% ($${props.payload.revenue.toLocaleString()})`, 
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {analyticsData.categoryData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products & Customer Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {analyticsData.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold text-indigo-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${product.revenue}</p>
                    <div className="flex items-center">
                      {product.growth > 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.growth > 0 ? '+' : ''}{product.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Insights */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Insights</h3>
            <div className="space-y-4">
              {analyticsData.customerInsights.map((insight, index) => (
                <div key={insight.metric} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      {index === 0 && <Users className="w-5 h-5 text-blue-600" />}
                      {index === 1 && <RefreshCw className="w-5 h-5 text-blue-600" />}
                      {index === 2 && <Heart className="w-5 h-5 text-blue-600" />}
                      {index === 3 && <Clock className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{insight.metric}</p>
                      <p className="text-lg font-bold text-gray-900">{insight.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {insight.change > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${insight.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {insight.change > 0 ? '+' : ''}{insight.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors">
              <Package className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">Add Product</span>
            </button>
            <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors">
              <Users className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">View Customers</span>
            </button>
            <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors">
              <MessageCircle className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">Messages</span>
            </button>
            <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors">
              <Calendar className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
