import React from 'react';
import { X, Star, MapPin, Truck, Clock, Shield, Phone, Mail, Package } from 'lucide-react';
import { mockSuppliers } from '../data/mockData';

interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplierId: string;
}

export default function SupplierModal({ isOpen, onClose, supplierId }: SupplierModalProps) {
  const supplier = mockSuppliers.find(s => s.id === supplierId);

  if (!isOpen || !supplier) return null;

  const mockProducts = [
    { name: 'Fresh Tomatoes', price: '$2.25/lb', category: 'Vegetables' },
    { name: 'Ground Beef', price: '$5.75/lb', category: 'Meat' },
    { name: 'Onions', price: '$1.50/lb', category: 'Vegetables' },
    { name: 'Bell Peppers', price: '$3.25/lb', category: 'Vegetables' }
  ];

  const mockReviews = [
    {
      id: 1,
      vendor: 'Maria\'s Tacos',
      rating: 5,
      comment: 'Excellent quality ingredients, always fresh and delivered on time.',
      date: '2024-12-15'
    },
    {
      id: 2,
      vendor: 'Golden Dumplings',
      rating: 4,
      comment: 'Good prices and reliable service. Bulk discounts are great.',
      date: '2024-12-10'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                {supplier.companyName.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{supplier.companyName}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-900">{supplier.rating}</span>
                    <span className="text-gray-600">(127 reviews)</span>
                  </div>
                  {supplier.verified && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      <Shield className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{supplier.location.address}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Quick Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Delivery</h4>
              </div>
              <p className="text-sm text-gray-600">
                {supplier.deliveryRadius} mile radius
              </p>
              <p className="text-sm text-gray-600">2-4 hours delivery</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">Min Order</h4>
              </div>
              <p className="text-lg font-bold text-green-600">
                ${supplier.minOrderValue}
              </p>
              <p className="text-sm text-gray-600">Bulk discounts available</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <h4 className="font-semibold text-gray-900">Response Time</h4>
              </div>
              <p className="text-sm text-gray-600">Usually responds</p>
              <p className="text-sm text-gray-600">within 2 hours</p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Product Categories</h4>
            <div className="flex flex-wrap gap-2">
              {supplier.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium capitalize"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Popular Products */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Popular Products</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {mockProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">{product.name}</h5>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <span className="font-semibold text-green-600">{product.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">{supplier.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h4>
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{review.vendor}</h5>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                  <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-medium">
              Contact Supplier
            </button>
            <button className="flex-1 border border-blue-600 text-blue-600 py-3 px-4 rounded-xl hover:bg-blue-50 transition-colors font-medium">
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}