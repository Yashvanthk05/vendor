import React, { useState } from 'react';
import { X, Users, MapPin, Tag } from 'lucide-react';

interface CreateCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (circleData: any) => void;
}

export default function CreateCircleModal({ isOpen, onClose, onSubmit }: CreateCircleModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'General',
    minMembers: 3,
    isPrivate: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'General',
    'Mexican',
    'Asian',
    'Mediterranean',
    'American',
    'Italian',
    'Indian',
    'Thai',
    'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Circle name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Circle name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (formData.minMembers < 2 || formData.minMembers > 20) {
      newErrors.minMembers = 'Minimum members must be between 2 and 20';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: '',
        description: '',
        category: 'General',
        minMembers: 3,
        isPrivate: false
      });
      setErrors({});
      onClose();
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Create Trust Circle</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Circle Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Circle Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Downtown Food Vendors"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 transition-colors ${
                errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the purpose and goals of your trust circle..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 transition-colors resize-none ${
                errors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Members */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Minimum Members
            </label>
            <input
              type="number"
              min="2"
              max="20"
              value={formData.minMembers}
              onChange={(e) => handleInputChange('minMembers', parseInt(e.target.value))}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 transition-colors ${
                errors.minMembers ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
              }`}
            />
            {errors.minMembers && (
              <p className="mt-1 text-sm text-red-600">{errors.minMembers}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Minimum number of members required to place group orders
            </p>
          </div>

          {/* Privacy Setting */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Private Circle</h4>
              <p className="text-sm text-gray-600">Only invited members can join</p>
            </div>
            <button
              type="button"
              onClick={() => handleInputChange('isPrivate', !formData.isPrivate)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.isPrivate ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.isPrivate ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
            >
              Create Circle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}