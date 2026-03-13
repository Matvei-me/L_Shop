import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createDelivery, getMyDeliveries } from "../controllers/delivery.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getMyDeliveries);
router.post("/", createDelivery);

export default router;
