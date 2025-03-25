import { NextFunction, Request, Response } from "express";

export function encryptionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next();
}
export function decryptionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next();
}
