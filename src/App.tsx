import React, { useState } from 'react';
import Navigation from './components/Navigation';
import VendorDashboard from './components/vendor/VendorDashboard';
import SupplierDashboard from './components/supplier/SupplierDashboard';
import TrustCircles from './components/TrustCircles';
import OrderTracking from './components/OrderTracking';
import OrderChat from './components/OrderChat';
import Settings from './components/Settings';
import { currentUser } from './data/mockData';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { effectiveTheme } = useTheme();
  const [activeView, setActiveView] = useState('dashboard');
  const [userRole] = useState<'vendor' | 'supplier'>(currentUser.role);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return userRole === 'vendor' ? <VendorDashboard /> : <SupplierDashboard />;
      case 'trust-circles':
        return <TrustCircles />;
      case 'orders':
        return <OrderTracking />;
      case 'chat':
        return <OrderChat />;
      case 'analytics':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Coming Soon</h2>
            <p className="text-gray-600">Advanced analytics and reporting features will be available here.</p>
          </div>
        );
      case 'products':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Management</h2>
            <p className="text-gray-600">Manage your product catalog and pricing here.</p>
          </div>
        );
      case 'settings':
        return <Settings />;
      default:
        return <VendorDashboard />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      effectiveTheme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      {/* Mobile Header */}
      <div className={`md:hidden border-b p-4 transition-colors duration-300 ${
        effectiveTheme === 'dark' 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h1 className="text-xl font-bold text-green-600">FoodCircle</h1>
        <p className={`text-sm capitalize transition-colors duration-300 ${
          effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>{userRole} Portal</p>
      </div>

      <div className="flex">
        <Navigation 
          activeView={activeView} 
          onViewChange={setActiveView}
          userRole={userRole}
        />
        
        <main className={`flex-1 md:ml-64 p-4 md:p-6 pb-20 md:pb-6 transition-colors duration-300 ${
          effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;