export interface User {
  id: string;
  name: string;
  email: string;
  role: 'vendor' | 'supplier';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  avatar?: string;
  rating: number;
  joinedAt: string;
}

export interface Vendor extends User {
  role: 'vendor';
  businessName: string;
  cuisineType: string;
  trustCircles: string[];
  totalOrders: number;
}

export interface Supplier extends User {
  role: 'supplier';
  companyName: string;
  categories: string[];
  verified: boolean;
  minOrderValue: number;
  deliveryRadius: number;
}

export interface TrustCircle {
  id: string;
  name: string;
  description: string;
  members: string[];
  createdBy: string;
  createdAt: string;
  totalOrders: number;
  minMembers: number;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  basePrice: number;
  minQuantity: number;
  supplierId: string;
  inStock: boolean;
  description: string;
}

export interface Order {
  id: string;
  trustCircleId: string;
  supplierId: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  discount: number;
  createdAt: string;
  expectedDelivery: string;
  participants: string[];
  chat: ChatMessage[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  vendorId: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  timestamp: string;
  type: 'text' | 'system';
}

export interface AIRecommendation {
  supplierId: string;
  score: number;
  reasons: string[];
  estimatedSavings: number;
  deliveryTime: string;
}