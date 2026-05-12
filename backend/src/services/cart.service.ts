import { promises as fs } from "fs";
import path from "path";
import { Cart, CartItem } from "../models/cart.model";
import { getProductById } from "./product.service";

const cartsPath = path.resolve(__dirname, "../data/carts.json");

async function readCarts(): Promise<Cart[]> {
  try {
    const data = await fs.readFile(cartsPath, "utf-8");
    return JSON.parse(data) as Cart[];
  } catch {
    return [];
  }
}

async function writeCarts(carts: Cart[]): Promise<void> {
  await fs.writeFile(cartsPath, JSON.stringify(carts, null, 2));
}

export async function getCartByUserId(userId: string): Promise<CartItem[]> {
  const carts = await readCarts();
  const cart = carts.find((c) => c.userId === userId);
  return cart?.items ?? [];
}

export async function addItem(
  userId: string,
  productId: string,
  quantity: number
): Promise<CartItem[]> {
  const product = await getProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  const carts = await readCarts();
  let cart = carts.find((c) => c.userId === userId);

  if (!cart) {
    cart = { userId, items: [] };
    carts.push(cart);
  }

  const existing = cart.items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await writeCarts(carts);
  return cart.items;
}

export async function updateItemQuantity(
  userId: string,
  productId: string,
  quantity: number
): Promise<CartItem[]> {
  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  const carts = await readCarts();
  const cart = carts.find((c) => c.userId === userId);
  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find((i) => i.productId === productId);
  if (!item) {
    throw new Error("Item not in cart");
  }

  item.quantity = quantity;
  await writeCarts(carts);
  return cart.items;
}

export async function removeItem(
  userId: string,
  productId: string
): Promise<CartItem[]> {
  const carts = await readCarts();
  const cart = carts.find((c) => c.userId === userId);
  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter((i) => i.productId !== productId);
  await writeCarts(carts);
  return cart.items;
}

export async function clearCart(userId: string): Promise<void> {
  const carts = await readCarts();
  const index = carts.findIndex((c) => c.userId === userId);
  if (index !== -1) {
    carts[index].items = [];
    await writeCarts(carts);
  }
}
