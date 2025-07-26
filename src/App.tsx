import React, { useState } from 'react';
import Navigation from './components/Navigation';
import VendorDashboard from './components/vendor/VendorDashboard';
import SupplierDashboard from './components/supplier/SupplierDashboard';
import TrustCircles from './components/TrustCircles';
import OrderTracking from './components/OrderTracking';
import OrderChat from './components/OrderChat';
import { currentUser } from './data/mockData';

function App() {
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
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Account settings and preferences will be available here.</p>
          </div>
        );
      default:
        return <VendorDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-green-600">FoodCircle</h1>
        <p className="text-sm text-gray-500 capitalize">{userRole} Portal</p>
      </div>

      <div className="flex">
        <Navigation 
          activeView={activeView} 
          onViewChange={setActiveView}
          userRole={userRole}
        />
        
        <main className="flex-1 md:ml-64 p-4 md:p-6 pb-20 md:pb-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;