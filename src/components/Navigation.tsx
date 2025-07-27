import React from 'react';
import { Users, ShoppingCart, MessageCircle, BarChart3, Settings, Home } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
  userRole: 'vendor' | 'supplier';
}

export default function Navigation({ activeView, onViewChange, userRole }: NavigationProps) {
  const { effectiveTheme } = useTheme();
  
  const vendorNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'trust-circles', label: 'Trust Circles', icon: Users },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'chat', label: 'Messages', icon: MessageCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const supplierNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: BarChart3 },
    { id: 'chat', label: 'Messages', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const navItems = userRole === 'vendor' ? vendorNavItems : supplierNavItems;

  return (
    <nav className={`border-t md:border-t-0 md:border-r fixed bottom-0 left-0 right-0 md:top-0 md:left-0 md:bottom-0 md:w-64 z-30 transition-colors duration-300 ${
      effectiveTheme === 'dark' 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex md:flex-col h-16 md:h-full">
        {/* Mobile header */}
        <div className={`hidden md:block p-4 border-b transition-colors duration-300 ${
          effectiveTheme === 'dark' ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <h1 className="text-xl font-bold text-green-600">FoodCircle</h1>
          <p className={`text-sm capitalize transition-colors duration-300 ${
            effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>{userRole} Portal</p>
        </div>

        {/* Navigation items */}
        <div className="flex md:flex-col flex-1 md:p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col md:flex-row items-center justify-center md:justify-start p-2 md:p-3 rounded-lg transition-colors flex-1 md:flex-none ${
                  activeView === item.id
                    ? effectiveTheme === 'dark'
                      ? 'bg-green-900/50 text-green-400'
                      : 'bg-green-100 text-green-700'
                    : effectiveTheme === 'dark'
                      ? 'text-gray-300 hover:bg-slate-700'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 md:mr-3" />
                <span className="text-xs md:text-sm mt-1 md:mt-0">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}