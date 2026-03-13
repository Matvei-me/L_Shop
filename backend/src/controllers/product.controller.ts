import { Request, Response, NextFunction } from "express";
import * as productService from "../services/product.service";

export async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const query = {
      search: req.query.search as string | undefined,
      sort: req.query.sort as string | undefined,
      category: req.query.category as string | undefined,
      available: req.query.available as string | undefined,
    };
    const products = await productService.getProducts(query);
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
}
