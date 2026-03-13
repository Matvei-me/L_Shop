export interface DeliveryFormDto {
  address: string;
  phone: string;
  email: string;
  payment: string;
}

export interface IOrder {
  id: string;
  userId: string;
  address: string;
  phone: string;
  email: string;
  payment: string;
  items: { productId: string; quantity: number }[];
  createdAt: string;
}
