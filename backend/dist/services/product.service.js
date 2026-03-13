"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = getProducts;
exports.getProductById = getProductById;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const productsPath = path_1.default.resolve(__dirname, "../data/products.json");
async function readProducts() {
    const data = await fs_1.promises.readFile(productsPath, "utf-8");
    return JSON.parse(data);
}
async function getProducts(query) {
    let products = await readProducts();
    if (query.search) {
        const search = query.search.toLowerCase();
        products = products.filter((p) => p.name.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search));
    }
    if (query.category) {
        products = products.filter((p) => p.category === query.category);
    }
    if (query.available !== undefined) {
        const available = query.available === "true";
        products = products.filter((p) => p.available === available);
    }
    if (query.sort === "price_asc") {
        products = [...products].sort((a, b) => a.price - b.price);
    }
    else if (query.sort === "price_desc") {
        products = [...products].sort((a, b) => b.price - a.price);
    }
    return products;
}
async function getProductById(id) {
    const products = await readProducts();
    return products.find((p) => p.id === id) ?? null;
}
