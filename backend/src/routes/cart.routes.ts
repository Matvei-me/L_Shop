import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cart.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getCart);
router.post("/items", addToCart);
router.patch("/items/:productId", updateCartItem);
router.delete("/items/:productId", removeFromCart);

export default router;
