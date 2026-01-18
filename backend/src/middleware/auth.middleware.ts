import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken, type TokenPayload } from "../utils/Jwt.ts";

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
    }
    
    const decoded = verifyAccessToken(token);

    (req as AuthRequest).user = decoded;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};

export const optionalAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next();
    }

    const decoded = verifyAccessToken(token);
    (req as AuthRequest).user = decoded;
    next();
  } catch {
    // If token is invalid, just proceed without user
    next();
  }
};

export { authMiddleware as authenticate };
