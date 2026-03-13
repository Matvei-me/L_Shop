import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

// 10 минут как в тз
const expiresIn = "10m";

export function generateToken(payload: { userId: string; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): { userId: string; email: string } {
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  return decoded;
}

export default { generateToken, verifyToken };
