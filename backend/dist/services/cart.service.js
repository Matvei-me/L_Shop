"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartByUserId = getCartByUserId;
exports.addItem = addItem;
exports.updateItemQuantity = updateItemQuantity;
exports.removeItem = removeItem;
exports.clearCart = clearCart;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const product_service_1 = require("./product.service");
const cartsPath = path_1.default.resolve(__dirname, "../data/carts.json");
async function readCarts() {
    try {
        const data = await fs_1.promises.readFile(cartsPath, "utf-8");
        return JSON.parse(data);
    }
    catch {
        return [];
    }
}
async function writeCarts(carts) {
    await fs_1.promises.writeFile(cartsPath, JSON.stringify(carts, null, 2));
}
async function getCartByUserId(userId) {
    const carts = await readCarts();
    const cart = carts.find((c) => c.userId === userId);
    return cart?.items ?? [];
}
async function addItem(userId, productId, quantity) {
    const product = await (0, product_service_1.getProductById)(productId);
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
    }
    else {
        cart.items.push({ productId, quantity });
    }
    await writeCarts(carts);
    return cart.items;
}
async function updateItemQuantity(userId, productId, quantity) {
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
async function removeItem(userId, productId) {
    const carts = await readCarts();
    const cart = carts.find((c) => c.userId === userId);
    if (!cart) {
        throw new Error("Cart not found");
    }
    cart.items = cart.items.filter((i) => i.productId !== productId);
    await writeCarts(carts);
    return cart.items;
}
async function clearCart(userId) {
    const carts = await readCarts();
    const index = carts.findIndex((c) => c.userId === userId);
    if (index !== -1) {
        carts[index].items = [];
        await writeCarts(carts);
    }
}
