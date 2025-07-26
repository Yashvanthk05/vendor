import React, { useState } from 'react';
import { Send, MessageCircle, Users } from 'lucide-react';
import { mockOrders, currentUser, mockVendors } from '../data/mockData';

export default function OrderChat() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const userOrders = mockOrders.filter(order => 
    order.participants.includes(currentUser.id)
  );

  const selectedOrderData = userOrders.find(order => order.id === selectedOrder);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedOrder) return;

    console.log('Sending message:', newMessage, 'to order:', selectedOrder);
    setNewMessage('');
  };

  const getUserName = (userId: string) => {
    if (userId === 'system') return 'System';
    const vendor = mockVendors.find(v => v.id === userId);
    return vendor?.name || 'Unknown User';
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Orders List */}
      <div className="lg:w-1/3">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Chats</h2>
        <div className="space-y-2">
          {userOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrder(order.id)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedOrder === order.id
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">
                  Order #{order.id.slice(-6)}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  {order.participants.length}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {order.items.length} items • ${order.totalAmount}
              </p>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.status}
                </span>
                {order.chat.length > 0 && (
                  <div className="flex items-center gap-1 text-sm text-blue-600">
                    <MessageCircle className="w-4 h-4" />
                    {order.chat.length}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:flex-1 flex flex-col">
        {selectedOrderData ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 border-b border-gray-200 rounded-t-lg">
              <h3 className="font-semibold text-gray-900">
                Order #{selectedOrderData.id.slice(-6)} Chat
              </h3>
              <p className="text-sm text-gray-600">
                {selectedOrderData.participants.length} participants
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 bg-white p-4 overflow-y-auto min-h-[400px] max-h-[500px]">
              <div className="space-y-4">
                {selectedOrderData.chat.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.userId === currentUser.id ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'system'
                          ? 'bg-gray-100 text-gray-700 text-center'
                          : message.userId === currentUser.id
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.type !== 'system' && (
                        <p className="text-xs font-medium mb-1 opacity-75">
                          {getUserName(message.userId)}
                        </p>
                      )}
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs mt-1 opacity-75">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="bg-white p-4 border-t border-gray-200 rounded-b-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Order</h3>
              <p className="text-gray-600">Choose an order from the list to view its chat</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}