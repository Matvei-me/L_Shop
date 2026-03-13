export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  login: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  address: string;
  phone: string;
  email: string;
  payment: string;
  items: { productId: string; quantity: number }[];
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
