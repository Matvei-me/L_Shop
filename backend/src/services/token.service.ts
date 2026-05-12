import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

/** срок жизни токена (совпадает с maxAge cookie) */
const expiresIn = "10m";

/**
 * @param payload id и email пользователя
 * @returns подпись JWT
 */
export function generateToken(payload: { userId: string; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * @param token строка из cookie
 * @returns payload с userId и email
 */
export function verifyToken(token: string): { userId: string; email: string } {
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  return decoded;
}

export default { generateToken, verifyToken };
