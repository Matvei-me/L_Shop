"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.getOrdersByUserId = getOrdersByUserId;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const cart_service_1 = require("./cart.service");
const ordersPath = path_1.default.resolve(__dirname, "../data/orders.json");
async function readOrders() {
    try {
        const data = await fs_1.promises.readFile(ordersPath, "utf-8");
        return JSON.parse(data);
    }
    catch {
        return [];
    }
}
async function writeOrders(orders) {
    await fs_1.promises.writeFile(ordersPath, JSON.stringify(orders, null, 2));
}
async function createOrder(userId, dto) {
    const items = await (0, cart_service_1.getCartByUserId)(userId);
    if (items.length === 0) {
        throw new Error("Cart is empty");
    }
    const order = {
        id: (0, uuid_1.v4)(),
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
    await (0, cart_service_1.clearCart)(userId);
    return order;
}
async function getOrdersByUserId(userId) {
    const orders = await readOrders();
    return orders.filter((o) => o.userId === userId);
}
