import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Order } from "../models/delivery.model";
import { DeliveryFormDto } from "../types/delivery.types";
import { getCartByUserId, clearCart } from "./cart.service";

const ordersPath = path.resolve(__dirname, "../data/orders.json");

async function readOrders(): Promise<Order[]> {
  try {
    const data = await fs.readFile(ordersPath, "utf-8");
    return JSON.parse(data) as Order[];
  } catch {
    return [];
  }
}

async function writeOrders(orders: Order[]): Promise<void> {
  await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));
}

export async function createOrder(
  userId: string,
  dto: DeliveryFormDto
): Promise<Order> {
  const items = await getCartByUserId(userId);
  if (items.length === 0) {
    throw new Error("Cart is empty");
  }

  const order: Order = {
    id: uuidv4(),
    userId,
    address: dto.address,
    phone: dto.phone,
    email: dto.email,
    payment: dto.payment,
    items: [...items],
    createdAt: new Date().toISOString(),
  };

  const orders = await readOrders();
  orders.push(order);
  await writeOrders(orders);

  await clearCart(userId);

  return order;
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const orders = await readOrders();
  return orders.filter((o) => o.userId === userId);
}
