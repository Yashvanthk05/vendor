import React, { useState } from 'react';
import { Users, Plus, MapPin, Calendar, ShoppingCart, Search } from 'lucide-react';
import { mockTrustCircles, currentUser } from '../data/mockData';

export default function TrustCircles() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCircle, setNewCircle] = useState({
    name: '',
    description: '',
    category: 'General',
    minMembers: 3
  });

  const userCircles = mockTrustCircles.filter(tc => 
    tc.members.includes(currentUser.id)
  );

  const availableCircles = mockTrustCircles.filter(tc => 
    !tc.members.includes(currentUser.id)
  );

  const filteredCircles = availableCircles.filter(circle =>
    circle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    circle.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCircle = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating circle:', newCircle);
    setShowCreateForm(false);
    setNewCircle({ name: '', description: '', category: 'General', minMembers: 3 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trust Circles</h1>
          <p className="text-gray-600">Join or create circles to bulk order with other vendors</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Circle
        </button>
      </div>

      {/* My Circles */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Trust Circles</h2>
        {userCircles.length === 0 ? (
          <p className="text-gray-600">You haven't joined any trust circles yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {userCircles.map((circle) => (
              <div key={circle.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{circle.name}</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Member
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{circle.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {circle.members.length} members
                    </span>
                    <span className="flex items-center gap-1">
                      <ShoppingCart className="w-4 h-4" />
                      {circle.totalOrders} orders
                    </span>
                  </div>
                  <button className="text-green-600 hover:text-green-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Available Circles */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Circles</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search circles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredCircles.map((circle) => (
            <div key={circle.id} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{circle.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{circle.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {circle.members.length}/{circle.minMembers} min members
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(circle.createdAt).toLocaleDateString()}
                </span>
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Request to Join
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Circle Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Trust Circle</h3>
            <form onSubmit={handleCreateCircle} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Circle Name
                </label>
                <input
                  type="text"
                  required
                  value={newCircle.name}
                  onChange={(e) => setNewCircle({ ...newCircle, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  value={newCircle.description}
                  onChange={(e) => setNewCircle({ ...newCircle, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newCircle.category}
                  onChange={(e) => setNewCircle({ ...newCircle, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="General">General</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Asian">Asian</option>
                  <option value="Mediterranean">Mediterranean</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Members
                </label>
                <input
                  type="number"
                  min="2"
                  max="20"
                  value={newCircle.minMembers}
                  onChange={(e) => setNewCircle({ ...newCircle, minMembers: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}