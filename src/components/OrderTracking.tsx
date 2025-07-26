import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, MessageCircle, Eye } from 'lucide-react';
import { mockOrders, currentUser, mockSuppliers } from '../data/mockData';

export default function OrderTracking() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const userOrders = mockOrders.filter(order => 
    order.participants.includes(currentUser.id)
  );

  const filteredOrders = userOrders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'confirmed': return CheckCircle;
      case 'processing': return Package;
      case 'shipped': return Truck;
      case 'delivered': return CheckCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-orange-600 bg-orange-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const statusSteps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Tracking</h1>
          <p className="text-gray-600">Track your group orders and delivery status</p>
        </div>
        
        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="grid gap-4">
        {filteredOrders.map((order) => {
          const supplier = mockSuppliers.find(s => s.id === order.supplierId);
          const StatusIcon = getStatusIcon(order.status);
          const statusColorClass = getStatusColor(order.status);
          
          return (
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order.id.slice(-6)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    From {supplier?.companyName} • {order.items.length} items
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusColorClass}`}>
                    <StatusIcon className="w-4 h-4" />
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Details */}
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Total Amount</p>
                  <p className="text-lg font-semibold text-gray-900">${order.totalAmount}</p>
                  {order.discount > 0 && (
                    <p className="text-sm text-green-600">Saved ${order.discount}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Order Date</p>
                  <p className="text-sm text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Expected Delivery</p>
                  <p className="text-sm text-gray-900">
                    {new Date(order.expectedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  {statusSteps.map((step, index) => {
                    const isCompleted = statusSteps.indexOf(order.status) >= index;
                    const isCurrent = order.status === step;
                    
                    return (
                      <div key={step} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          isCompleted 
                            ? 'bg-green-600 text-white' 
                            : isCurrent 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-200 text-gray-600'
                        }`}>
                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                        </div>
                        <span className="text-xs text-gray-600 mt-1 capitalize">{step}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${((statusSteps.indexOf(order.status) + 1) / statusSteps.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Chat ({order.chat.length})
                </button>
              </div>

              {/* Expanded Details */}
              {selectedOrder === order.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Product #{item.productId}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-900">${item.unitPrice * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? "You haven't placed any orders yet." 
              : `No orders with status "${filter}".`
            }
          </p>
        </div>
      )}
    </div>
  );
}