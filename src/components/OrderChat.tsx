import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  MessageCircle, 
  Users, 
  Search, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Circle,
  Package,
  Truck,
  Clock,
  Filter
} from 'lucide-react';
import { mockOrders, currentUser, mockVendors } from '../data/mockData';

export default function OrderChat() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userOrders = mockOrders.filter(order => 
    order.participants.includes(currentUser.id) &&
    (filterStatus === 'all' || order.status === filterStatus) &&
    (searchTerm === '' || order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const selectedOrderData = userOrders.find(order => order.id === selectedOrder);

  useEffect(() => {
    scrollToBottom();
  }, [selectedOrderData?.chat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedOrder) return;

    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);

    console.log('Sending message:', newMessage, 'to order:', selectedOrder);
    setNewMessage('');
  };

  const getUserName = (userId: string) => {
    if (userId === 'system') return 'System';
    if (userId === currentUser.id) return 'You';
    const vendor = mockVendors.find(v => v.id === userId);
    return vendor?.name || 'Unknown User';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const getMessageStatus = (message: any) => {
    if (message.userId !== currentUser.id) return null;
    return message.read ? <CheckCheck className="w-3 h-3 text-blue-500" /> : <Check className="w-3 h-3 text-gray-400" />;
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="h-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Sidebar - Orders List */}
        <div className="lg:w-1/3 xl:w-1/4 flex flex-col border-r border-gray-100">
          
          {/* Header Section */}
          <div className="p-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-tl-3xl lg:rounded-tr-none rounded-tr-3xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <MessageCircle className="w-6 h-6" />
                </div>
                Order Chats
              </h2>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-medium">{userOrders.length}</span>
              </div>
            </div>
            <p className="text-blue-100 text-sm opacity-90">Active conversations</p>
          </div>

          {/* Search and Filter Section */}
          <div className="p-5 bg-gray-50/50 border-b border-gray-100">
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm placeholder-gray-400"
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: 'all', label: 'All', color: 'blue' },
                  { key: 'processing', label: 'Active', color: 'orange' },
                  { key: 'delivered', label: 'Delivered', color: 'green' }
                ].map(({ key, label, color }) => (
                  <button
                    key={key}
                    onClick={() => setFilterStatus(key)}
                    className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                      filterStatus === key 
                        ? `bg-${color}-100 text-${color}-700 shadow-sm` 
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="space-y-3">
              {userOrders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order.id)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                    selectedOrder === order.id
                      ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-200 shadow-lg ring-2 ring-blue-100'
                      : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200'
                  }`}
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">
                        Order #{order.id.slice(-6)}
                      </h3>
                      {order.chat.some(msg => !msg.read && msg.userId !== currentUser.id) && (
                        <div className="relative">
                          <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                          <span className="absolute inset-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg">
                      <Users className="w-3 h-3 text-gray-500" />
                      <span className="text-xs font-medium text-gray-600">{order.participants.length}</span>
                    </div>
                  </div>
                  
                  {/* Order Details */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {order.items.length} items • <span className="font-bold text-emerald-600">${order.totalAmount}</span>
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl ${
                        order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                      
                      {order.chat.length > 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-lg">
                          <MessageCircle className="w-3 h-3 text-blue-500" />
                          <span className="text-xs font-semibold text-blue-600">{order.chat.length}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Last Message Preview */}
                  {order.chat.length > 0 && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 truncate">
                        <span className="font-medium">{getUserName(order.chat[order.chat.length - 1].userId)}:</span> {order.chat[order.chat.length - 1].message}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="lg:flex-1 flex flex-col">
          {selectedOrderData ? (
            <>
              {/* Chat Header */}
              <div className="p-6 bg-white border-b border-gray-100 rounded-tr-3xl lg:rounded-tl-none">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white">
                      {getStatusIcon(selectedOrderData.status)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-xl">
                        Order #{selectedOrderData.id.slice(-6)}
                      </h3>
                      <div className="flex items-center gap-6 mt-1">
                        <span className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          {selectedOrderData.participants.length} participants
                        </span>
                        <span className="flex items-center gap-2 text-sm text-gray-600">
                          <Package className="w-4 h-4" />
                          {selectedOrderData.items.length} items
                        </span>
                        <span className="font-bold text-emerald-600">
                          ${selectedOrderData.totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {[
                      { icon: Phone, color: 'blue', hoverColor: 'blue' },
                      { icon: Video, color: 'emerald', hoverColor: 'emerald' },
                      { icon: MoreVertical, color: 'gray', hoverColor: 'gray' }
                    ].map(({ icon: Icon, color, hoverColor }, index) => (
                      <button
                        key={index}
                        className={`p-3 text-gray-400 hover:text-${hoverColor}-600 hover:bg-${hoverColor}-50 rounded-xl transition-all duration-200`}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span className="font-medium">Order Progress</span>
                    <span className="capitalize font-bold text-gray-900">{selectedOrderData.status}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-700 ease-out ${
                        selectedOrderData.status === 'delivered' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 w-full' :
                        selectedOrderData.status === 'shipped' ? 'bg-gradient-to-r from-purple-400 to-purple-600 w-3/4' :
                        selectedOrderData.status === 'processing' ? 'bg-gradient-to-r from-blue-400 to-blue-600 w-1/2' :
                        'bg-gradient-to-r from-amber-400 to-amber-600 w-1/4'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-50/30 to-white">
                <div className="max-w-4xl mx-auto space-y-6">
                  {selectedOrderData.chat.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.userId === currentUser.id ? 'justify-end' : 'justify-start'
                      } animate-fade-in`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-5 py-4 shadow-sm ${
                          message.type === 'system'
                            ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-center mx-auto rounded-2xl'
                            : message.userId === currentUser.id
                              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl rounded-br-lg'
                              : 'bg-white border border-gray-200 text-gray-900 rounded-3xl rounded-bl-lg shadow-md'
                        }`}
                      >
                        {message.type !== 'system' && message.userId !== currentUser.id && (
                          <p className="text-xs font-bold mb-2 text-blue-600">
                            {getUserName(message.userId)}
                          </p>
                        )}
                        <p className="text-sm leading-relaxed">{message.message}</p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs opacity-75">
                            {new Date(message.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                          {getMessageStatus(message)}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Enhanced Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-5 py-4 rounded-3xl rounded-bl-lg shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Enhanced Message Input */}
              <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-gray-100 rounded-br-3xl">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-end gap-4">
                    <button
                      type="button"
                      className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all duration-200"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm placeholder-gray-400"
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-amber-500 rounded-xl transition-all duration-200"
                      >
                        <Smile className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:hover:scale-100"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            /* Enhanced Empty State */
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50/50 to-white rounded-tr-3xl rounded-br-3xl">
              <div className="text-center max-w-md mx-auto p-8">
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                    <MessageCircle className="w-16 h-16 text-blue-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Select an Order Chat</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Choose an order from the list to start chatting with vendors and track your order progress in real-time.
                </p>
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Pro Tip:</strong> Use the search and filter options to quickly find specific orders
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
