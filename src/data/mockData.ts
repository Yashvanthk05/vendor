import { User, Vendor, Supplier, TrustCircle, Product, Order, ChatMessage } from '../types';

export const mockVendors: Vendor[] = [
  {
    id: 'v1',
    name: 'Maria Santos',
    email: 'maria@tacos.com',
    role: 'vendor',
    businessName: 'Maria\'s Tacos',
    cuisineType: 'Mexican',
    location: { lat: 40.7128, lng: -74.0060, address: '123 Street Food Ave, NYC' },
    rating: 4.8,
    trustCircles: ['tc1', 'tc2'],
    totalOrders: 156,
    joinedAt: '2024-01-15'
  },
  {
    id: 'v2',
    name: 'John Chen',
    email: 'john@dumplings.com',
    role: 'vendor',
    businessName: 'Golden Dumplings',
    cuisineType: 'Chinese',
    location: { lat: 40.7580, lng: -73.9855, address: '456 Food Court St, NYC' },
    rating: 4.6,
    trustCircles: ['tc1'],
    totalOrders: 89,
    joinedAt: '2024-02-20'
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: 's1',
    name: 'Fresh Foods Inc',
    email: 'contact@freshfoods.com',
    role: 'supplier',
    companyName: 'Fresh Foods Distribution',
    categories: ['vegetables', 'meat', 'dairy'],
    location: { lat: 40.6892, lng: -74.0445, address: '789 Wholesale Blvd, NJ' },
    rating: 4.9,
    verified: true,
    minOrderValue: 500,
    deliveryRadius: 50,
    joinedAt: '2023-08-10'
  },
  {
    id: 's2',
    name: 'Spice World',
    email: 'hello@spiceworld.com',
    role: 'supplier',
    companyName: 'Spice World Trading',
    categories: ['spices', 'condiments', 'dry goods'],
    location: { lat: 40.7282, lng: -73.7949, address: '321 Spice Market Rd, Queens' },
    rating: 4.7,
    verified: true,
    minOrderValue: 200,
    deliveryRadius: 30,
    joinedAt: '2023-09-15'
  }
];

export const mockTrustCircles: TrustCircle[] = [
  {
    id: 'tc1',
    name: 'Downtown Food Vendors',
    description: 'Coalition of street food vendors in downtown area for bulk purchasing',
    members: ['v1', 'v2'],
    createdBy: 'v1',
    createdAt: '2024-03-01',
    totalOrders: 23,
    minMembers: 3,
    category: 'General'
  },
  {
    id: 'tc2',
    name: 'Mexican Cuisine Circle',
    description: 'Specialized group for Mexican food vendors sharing authentic ingredients',
    members: ['v1'],
    createdBy: 'v1',
    createdAt: '2024-03-15',
    totalOrders: 8,
    minMembers: 2,
    category: 'Mexican'
  }
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Tomatoes',
    category: 'vegetables',
    unit: 'lb',
    basePrice: 2.50,
    minQuantity: 10,
    supplierId: 's1',
    inStock: true,
    description: 'Premium quality vine-ripened tomatoes'
  },
  {
    id: 'p2',
    name: 'Ground Beef (80/20)',
    category: 'meat',
    unit: 'lb',
    basePrice: 5.99,
    minQuantity: 20,
    supplierId: 's1',
    inStock: true,
    description: 'Fresh ground beef, 80% lean'
  },
  {
    id: 'p3',
    name: 'Cumin Powder',
    category: 'spices',
    unit: 'oz',
    basePrice: 0.75,
    minQuantity: 50,
    supplierId: 's2',
    inStock: true,
    description: 'Premium ground cumin spice'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    trustCircleId: 'tc1',
    supplierId: 's1',
    items: [
      { productId: 'p1', quantity: 30, unitPrice: 2.25, vendorId: 'v1' },
      { productId: 'p2', quantity: 40, unitPrice: 5.75, vendorId: 'v2' }
    ],
    status: 'processing',
    totalAmount: 297.5,
    discount: 32.5,
    createdAt: '2024-12-20T10:00:00Z',
    expectedDelivery: '2024-12-22T14:00:00Z',
    participants: ['v1', 'v2'],
    chat: [
      {
        id: 'c1',
        userId: 'system',
        message: 'Order confirmed! Expected delivery: Dec 22, 2:00 PM',
        timestamp: '2024-12-20T10:05:00Z',
        type: 'system'
      },
      {
        id: 'c2',
        userId: 'v1',
        message: 'Great! Thanks for organizing this group order',
        timestamp: '2024-12-20T10:10:00Z',
        type: 'text'
      }
    ]
  }
];

export const currentUser: Vendor = mockVendors[0];