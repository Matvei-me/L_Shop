import { Response, NextFunction } from "express";
import * as deliveryService from "../services/delivery.service";
import { AuthRequest } from "../types/express.d";

export async function createDelivery(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const { address, phone, email, payment } = req.body;
    if (!address || !phone || !email || !payment) {
      return res.status(400).json({ message: "заполни адрес, телефон, почту и способ оплаты" });
    }

    const order = await deliveryService.createOrder(req.userId, {
      address,
      phone,
      email,
      payment,
    });
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}

export async function getMyDeliveries(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
    const orders = await deliveryService.getOrdersByUserId(req.userId);
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
}
