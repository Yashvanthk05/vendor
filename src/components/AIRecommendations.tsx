import React, { useState, useEffect } from 'react';
import { Brain, Star, MapPin, TrendingUp, Clock } from 'lucide-react';
import { mockSuppliers, currentUser } from '../data/mockData';
import { AIRecommendation } from '../types';

export default function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI recommendation generation
    setTimeout(() => {
      const aiRecommendations: AIRecommendation[] = mockSuppliers.map((supplier, index) => ({
        supplierId: supplier.id,
        score: 0.85 + (index * 0.05),
        reasons: [
          `${(2.5 + index * 0.5).toFixed(1)} miles from your location`,
          `${supplier.rating}/5.0 customer rating`,
          index === 0 ? 'Bulk pricing available' : 'Fast delivery options',
          'Verified supplier status'
        ],
        estimatedSavings: 45 + (index * 15),
        deliveryTime: index === 0 ? '2-3 hours' : '4-6 hours'
      }));
      
      setRecommendations(aiRecommendations.slice(0, 3));
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Supplier Recommendations</h3>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Supplier Recommendations</h3>
        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
          Updated now
        </span>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const supplier = mockSuppliers.find(s => s.id === rec.supplierId);
          if (!supplier) return null;

          return (
            <div key={rec.supplierId} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    {supplier.companyName}
                    {index === 0 && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Best Match
                      </span>
                    )}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {supplier.rating}/5.0
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {rec.reasons[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {rec.deliveryTime}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-purple-600 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    {Math.round(rec.score * 100)}% match
                  </div>
                  <p className="text-sm text-green-600 font-medium">
                    Save ~${rec.estimatedSavings}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {rec.reasons.slice(1).map((reason, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white bg-opacity-60 text-gray-700 text-xs rounded-full"
                  >
                    {reason}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                  View Supplier
                </button>
                <button className="px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium">
                  Add to Circle
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>AI Insight:</strong> Ordering with 3+ vendors in your area can save an average of 23% on bulk purchases.
        </p>
      </div>
    </div>
  );
}