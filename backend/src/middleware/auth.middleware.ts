import { Response, NextFunction } from "express";
import tokenService from "../services/token.service";
import { AuthRequest } from "../types/express.d";

const COOKIE_NAME = "sessionToken";

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  try {
    const payload = tokenService.verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
}
