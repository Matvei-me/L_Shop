import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import tokenService from "../services/token.service";

// по тз: кука 10 мин, HttpOnly (в document.cookies не видна)
const COOKIE_NAME = "sessionToken";
const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 10 * 60 * 1000,
  sameSite: "lax" as const,
  path: "/",
};

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.register(req.body);
    const token = tokenService.generateToken({ userId: user.id, email: user.email });

    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
    res.status(201).json({ success: true, data: { userId: user.id } });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.login(req.body);
    const token = tokenService.generateToken({ userId: user.id, email: user.email });

    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
    res.json({ success: true, data: { userId: user.id } });
  } catch (error) {
    next(error);
  }
}

export function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie(COOKIE_NAME, { path: "/" });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}
