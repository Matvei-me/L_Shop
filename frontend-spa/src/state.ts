import type { UserProfile, CartItem, Product } from "./types";

export let currentUser: UserProfile | null = null;
export let cartItems: CartItem[] = [];
export let productsCache: Product[] = [];

export function setCurrentUser(user: UserProfile | null): void {
  currentUser = user;
}

export function setCartItems(items: CartItem[]): void {
  cartItems = items;
}

export function setProductsCache(products: Product[]): void {
  productsCache = products;
}
