import React, { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  CreditCard,
  MapPin,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit3,
  Phone,
  Mail,
  Store,
  Truck,
  Clock,
  Star,
  Eye,
  EyeOff,
  Camera,
  Save,
  X,
  Palette,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { currentUser } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  items: SettingsItem[];
}

interface SettingsItem {
  id: string;
  label: string;
  description?: string;
  type: 'navigation' | 'toggle' | 'info' | 'action';
  value?: string | boolean;
  action?: () => void;
}

export default function Settings() {
  const { theme, setTheme, effectiveTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    circleInvites: true,
    promotions: false,
    weeklyReports: true
  });

  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: '+1 (555) 123-4567',
    businessName: currentUser.businessName,
    address: currentUser.location.address
  });

  const themeOptions = [
    {
      id: 'light' as const,
      label: 'Light',
      description: 'Clean and bright interface',
      icon: Sun
    },
    {
      id: 'dark' as const,
      label: 'Dark',
      description: 'Easy on the eyes in low light',
      icon: Moon
    },
    {
      id: 'system' as const,
      label: 'System',
      description: 'Matches your device settings',
      icon: Monitor
    }
  ];

  const settingsSections: SettingsSection[] = [
    {
      id: 'account',
      title: 'Account & Profile',
      icon: User,
      items: [
        {
          id: 'profile',
          label: 'Personal Information',
          description: 'Update your profile details',
          type: 'navigation'
        },
        {
          id: 'business',
          label: 'Business Details',
          description: 'Manage your business information',
          type: 'navigation'
        },
        {
          id: 'password',
          label: 'Password & Security',
          description: 'Change password and security settings',
          type: 'navigation'
        }
      ]
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      items: [
        {
          id: 'theme',
          label: 'Theme',
          description: 'Choose your preferred app theme',
          type: 'navigation'
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          id: 'order-updates',
          label: 'Order Updates',
          description: 'Get notified about order status changes',
          type: 'toggle',
          value: notifications.orderUpdates
        },
        {
          id: 'circle-invites',
          label: 'Trust Circle Invites',
          description: 'Notifications for new circle invitations',
          type: 'toggle',
          value: notifications.circleInvites
        },
        {
          id: 'promotions',
          label: 'Promotions & Offers',
          description: 'Special deals and promotional content',
          type: 'toggle',
          value: notifications.promotions
        },
        {
          id: 'weekly-reports',
          label: 'Weekly Reports',
          description: 'Summary of your activity and savings',
          type: 'toggle',
          value: notifications.weeklyReports
        }
      ]
    },
    {
      id: 'payment',
      title: 'Payment & Billing',
      icon: CreditCard,
      items: [
        {
          id: 'payment-methods',
          label: 'Payment Methods',
          description: 'Manage your cards and payment options',
          type: 'navigation'
        },
        {
          id: 'billing-history',
          label: 'Billing History',
          description: 'View past transactions and invoices',
          type: 'navigation'
        },
        {
          id: 'auto-pay',
          label: 'Auto-Pay Settings',
          description: 'Configure automatic payment preferences',
          type: 'navigation'
        }
      ]
    },
    {
      id: 'location',
      title: 'Location & Delivery',
      icon: MapPin,
      items: [
        {
          id: 'addresses',
          label: 'Delivery Addresses',
          description: 'Manage your business and delivery locations',
          type: 'navigation'
        },
        {
          id: 'delivery-preferences',
          label: 'Delivery Preferences',
          description: 'Set preferred delivery times and instructions',
          type: 'navigation'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        {
          id: 'privacy-settings',
          label: 'Privacy Settings',
          description: 'Control who can see your information',
          type: 'navigation'
        },
        {
          id: 'data-usage',
          label: 'Data & Storage',
          description: 'Manage your data and storage preferences',
          type: 'navigation'
        },
        {
          id: 'two-factor',
          label: 'Two-Factor Authentication',
          description: 'Add an extra layer of security',
          type: 'navigation'
        }
      ]
    },
    {
      id: 'support',
      title: 'Help & Support',
      icon: HelpCircle,
      items: [
        {
          id: 'help-center',
          label: 'Help Center',
          description: 'Find answers to common questions',
          type: 'navigation'
        },
        {
          id: 'contact-support',
          label: 'Contact Support',
          description: 'Get help from our support team',
          type: 'navigation'
        },
        {
          id: 'feedback',
          label: 'Send Feedback',
          description: 'Help us improve FoodCircle',
          type: 'navigation'
        }
      ]
    }
  ];

  const handleToggle = (itemId: string) => {
    setNotifications(prev => ({
      ...prev,
      [itemId.replace('-', '')]: !prev[itemId.replace('-', '') as keyof typeof prev]
    }));
  };

  const handleSaveProfile = () => {
    setEditingProfile(false);
    // Here you would typically save to backend
    console.log('Saving profile:', profileData);
  };

  const renderThemeSelector = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Theme Settings</h3>
          <button
            onClick={() => setActiveSection(null)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Choose Theme</h4>
            <p className="text-gray-600">Select your preferred app appearance</p>
          </div>

          <div className="grid gap-4">
            {themeOptions.map((themeOption) => {
              const Icon = themeOption.icon;
              const isSelected = theme === themeOption.id;
              
              return (
                <button
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      isSelected ? 'bg-purple-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isSelected ? 'text-purple-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h5 className={`font-semibold ${
                        isSelected ? 'text-purple-900' : 'text-gray-900'
                      }`}>
                        {themeOption.label}
                      </h5>
                      <p className={`text-sm ${
                        isSelected ? 'text-purple-700' : 'text-gray-600'
                      }`}>
                        {themeOption.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Theme Preview */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <h5 className="font-medium text-gray-900 mb-3">Preview</h5>
            <div className={`rounded-lg p-4 border transition-colors ${
              effectiveTheme === 'dark' 
                ? 'bg-slate-800 border-slate-600 text-white' 
                : 'bg-white border-gray-200 text-gray-900'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Store className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h6 className={`font-medium ${
                    effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Sample Order</h6>
                  <p className={`text-sm ${
                    effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Fresh ingredients delivery</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Delivered
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                setActiveSection(null);
                console.log('Theme applied:', theme);
              }}
              className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-xl hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Apply Theme
            </button>
            <button
              onClick={() => setActiveSection(null)}
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfileEdit = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Edit Profile</h3>
          <button
            onClick={() => setEditingProfile(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -right-1 p-2 bg-white border-2 border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Profile Picture</h4>
            <p className="text-sm text-gray-600">Update your profile photo</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              value={profileData.businessName}
              onChange={(e) => setProfileData(prev => ({ ...prev, businessName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
          <textarea
            value={profileData.address}
            onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSaveProfile}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
          <button
            onClick={() => setEditingProfile(false)}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  if (editingProfile) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setEditingProfile(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
        {renderProfileEdit()}
      </div>
    );
  }

  if (activeSection === 'theme') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setActiveSection(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
        {renderThemeSelector()}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">{currentUser.name}</h3>
              <p className="text-green-100">{currentUser.businessName}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-green-100">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {currentUser.rating} rating
                </span>
                <span className="flex items-center gap-1">
                  <Store className="w-4 h-4" />
                  {currentUser.totalOrders} orders
                </span>
              </div>
            </div>
            <button
              onClick={() => setEditingProfile(true)}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
            >
              <Edit3 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="theme-bg-primary rounded-2xl shadow-sm theme-border border overflow-hidden">
              <div className="px-6 py-4 theme-border-light border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 theme-bg-tertiary rounded-lg">
                    <Icon className="w-5 h-5 theme-text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold theme-text-primary">{section.title}</h3>
                </div>
              </div>
              
              <div className="divide-y theme-border-light">
                {section.items.map((item) => (
                  <div key={item.id} className="px-6 py-4 hover:theme-bg-tertiary transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium theme-text-primary">{item.label}</h4>
                        {item.description && (
                          <p className="text-sm theme-text-secondary mt-1">{item.description}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {item.type === 'toggle' && (
                          <button
                            onClick={() => handleToggle(item.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              item.value ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                item.value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}
                        
                        {item.type === 'navigation' && (
                          <button
                            onClick={() => {
                              if (item.id === 'profile') {
                                setEditingProfile(true);
                              } else if (item.id === 'theme') {
                                setActiveSection('theme');
                              } else {
                                console.log('Navigate to:', item.id);
                              }
                            }}
                            className="p-1 hover:theme-bg-tertiary rounded-lg transition-colors"
                          >
                            <ChevronRight className="w-5 h-5 theme-text-tertiary" />
                          </button>
                        )}
                        
                        {item.type === 'info' && item.value && (
                          <span className="text-sm theme-text-secondary">{item.value}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* App Info & Logout */}
      <div className="theme-bg-primary rounded-2xl shadow-sm theme-border border overflow-hidden">
        <div className="px-6 py-4 theme-border-light border-b">
          <h3 className="text-lg font-semibold theme-text-primary">App Information</h3>
        </div>
        
        <div className="divide-y theme-border-light">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h4 className="font-medium theme-text-primary">Version</h4>
              <p className="text-sm theme-text-secondary">FoodCircle v2.1.0</p>
            </div>
          </div>
          
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h4 className="font-medium theme-text-primary">Terms & Privacy</h4>
              <p className="text-sm theme-text-secondary">Review our terms and privacy policy</p>
            </div>
            <ChevronRight className="w-5 h-5 theme-text-tertiary" />
          </div>
          
          <div className="px-6 py-4">
            <button className="flex items-center gap-3 text-red-600 hover:text-red-700 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-sm theme-text-tertiary">
          Made with ❤️ for street food vendors
        </p>
      </div>
    </div>
  );
}