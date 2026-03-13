import type { ApiResponse, CartItem, Order, Product, UserProfile } from "./types";

const API = "/api";

// куки с бэка подхватываются только с credentials: "include"
async function fetchApi<T>(path: string, opts: RequestInit = {}): Promise<ApiResponse<T>> {
  const res = await fetch(API + path, {
    ...opts,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(opts.headers as object) },
  });
  const data = (await res.json()) as ApiResponse<T>;
  if (!res.ok) throw new Error(data.message || "что-то пошло не так");
  return data;
}

export async function register(data: {
  name: string;
  email: string;
  login: string;
  phone: string;
  password: string;
}) {
  return fetchApi<{ userId: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(data: { email: string; password: string }) {
  return fetchApi<{ userId: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logout() {
  return fetchApi<undefined>("/auth/logout", { method: "POST" });
}

export async function getProfile() {
  return fetchApi<UserProfile>("/profile");
}

export async function getProducts(params: {
  search?: string;
  sort?: string;
  category?: string;
  available?: string;
}) {
  const q = new URLSearchParams();
  if (params.search) q.set("search", params.search);
  if (params.sort) q.set("sort", params.sort);
  if (params.category) q.set("category", params.category);
  if (params.available !== undefined) q.set("available", params.available);
  const qs = q.toString();
  return fetchApi<Product[]>(`/products${qs ? "?" + qs : ""}`);
}

export async function getCart() {
  return fetchApi<CartItem[]>("/cart");
}

export async function addToCart(productId: string, quantity: number) {
  return fetchApi<CartItem[]>("/cart/items", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function updateCartItem(productId: string, quantity: number) {
  return fetchApi<CartItem[]>(`/cart/items/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });
}

export async function removeFromCart(productId: string) {
  return fetchApi<CartItem[]>(`/cart/items/${productId}`, { method: "DELETE" });
}

export async function createDelivery(data: {
  address: string;
  phone: string;
  email: string;
  payment: string;
}) {
  return fetchApi<Order>("/delivery", { method: "POST", body: JSON.stringify(data) });
}

export async function getMyDeliveries() {
  return fetchApi<Order[]>("/delivery");
}
