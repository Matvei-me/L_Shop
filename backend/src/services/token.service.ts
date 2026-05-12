import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

/** время жизни JWT строкой для jwt.sign (10 мин по ТЗ) */
const expiresIn = "10m";

/**
 * JWT для cookie sessionToken.
 * @param payload {{ userId: string, email: string }} данные внутрь токена
 * @returns {string} подписанная строка
 */
export function generateToken(payload: { userId: string; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * проверка jwt из cookie
 * @param token {string} значение cookie
 * @returns {{ userId: string, email: string }} распаршенный payload
 */
export function verifyToken(token: string): { userId: string; email: string } {
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  return decoded;
}

export default { generateToken, verifyToken };
