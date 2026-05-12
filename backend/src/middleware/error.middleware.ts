import { Request, Response, NextFunction } from "express";

/** последний middleware — ловит ошибки из контроллеров и отдаёт json с message */
export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err);

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
}
