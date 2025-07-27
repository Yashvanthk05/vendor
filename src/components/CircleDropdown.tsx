import React, { useState, useRef, useEffect } from 'react';
import { Users, Plus, Check, ChevronDown } from 'lucide-react';
import { mockTrustCircles, currentUser } from '../data/mockData';

interface CircleDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCircle: (circleId: string) => void;
  supplierId: string;
}

export default function CircleDropdown({ isOpen, onClose, onAddToCircle, supplierId }: CircleDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCircles, setSelectedCircles] = useState<string[]>([]);

  const userCircles = mockTrustCircles.filter(tc => 
    tc.members.includes(currentUser.id)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleCircleToggle = (circleId: string) => {
    setSelectedCircles(prev => {
      if (prev.includes(circleId)) {
        return prev.filter(id => id !== circleId);
      } else {
        return [...prev, circleId];
      }
    });
  };

  const handleAddToSelected = () => {
    selectedCircles.forEach(circleId => {
      onAddToCircle(circleId);
    });
    setSelectedCircles([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">Add to Trust Circle</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">Select circles to add this supplier</p>
      </div>

      {/* Circles List */}
      <div className="max-h-64 overflow-y-auto">
        {userCircles.length === 0 ? (
          <div className="p-6 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-2">No Trust Circles</h4>
            <p className="text-sm text-gray-600 mb-4">
              You need to join or create a trust circle first
            </p>
            <button className="flex items-center gap-2 mx-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" />
              Create Circle
            </button>
          </div>
        ) : (
          <div className="p-2">
            {userCircles.map((circle) => (
              <button
                key={circle.id}
                onClick={() => handleCircleToggle(circle.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                  selectedCircles.includes(circle.id) ? 'bg-green-50 border border-green-200' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    selectedCircles.includes(circle.id) ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <Users className={`w-4 h-4 ${
                      selectedCircles.includes(circle.id) ? 'text-green-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900 text-sm">{circle.name}</h4>
                    <p className="text-xs text-gray-600">{circle.members.length} members</p>
                  </div>
                </div>
                {selectedCircles.includes(circle.id) && (
                  <Check className="w-5 h-5 text-green-600" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {userCircles.length > 0 && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToSelected}
              disabled={selectedCircles.length === 0}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Add to {selectedCircles.length} Circle{selectedCircles.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}