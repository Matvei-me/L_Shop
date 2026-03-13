import { Response, NextFunction } from "express";
import * as cartService from "../services/cart.service";
import { AuthRequest } from "../types/express.d";

export async function getCart(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
    const items = await cartService.getCartByUserId(req.userId);
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
}

export async function addToCart(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
    const { productId, quantity } = req.body;
    const qty = typeof quantity === "number" && quantity > 0 ? quantity : 1;
    const items = await cartService.addItem(req.userId, productId, qty);
    res.status(201).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
}

export async function updateCartItem(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
    const { quantity } = req.body;
    const productId = String(req.params.productId);
    const items = await cartService.updateItemQuantity(req.userId, productId, quantity);
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
}

export async function removeFromCart(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
    const productId = String(req.params.productId);
    const items = await cartService.removeItem(req.userId, productId);
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
}
