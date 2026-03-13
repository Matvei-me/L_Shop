import { promises as fs } from "fs";
import path from "path";
import { Product } from "../models/product.model";

const productsPath = path.resolve(__dirname, "../data/products.json");

async function readProducts(): Promise<Product[]> {
  const data = await fs.readFile(productsPath, "utf-8");
  return JSON.parse(data);
}

export async function getProducts(query: {
  search?: string;
  sort?: string;
  category?: string;
  available?: string;
}): Promise<Product[]> {
  let products = await readProducts();

  // поиск по названию и описанию
  if (query.search) {
    const s = query.search.toLowerCase();
    products = products.filter(
      (p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)
    );
  }
  if (query.category) {
    products = products.filter((p) => p.category === query.category);
  }
  if (query.available !== undefined) {
    const ok = query.available === "true";
    products = products.filter((p) => p.available === ok);
  }
  if (query.sort === "price_asc") {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (query.sort === "price_desc") {
    products = [...products].sort((a, b) => b.price - a.price);
  }

  return products;
}

export async function getProductById(id: string) {
  const products = await readProducts();
  return products.find((p) => p.id === id) ?? null;
}
