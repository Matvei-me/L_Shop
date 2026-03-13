export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ICart {
  userId: string;
  items: CartItem[];
}
