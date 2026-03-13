import { Response, NextFunction } from "express";
import { findUserById } from "../services/auth.service";
import { AuthRequest } from "../types/express.d";

export async function getProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // в ответе без пароля
    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        login: user.login,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
}
