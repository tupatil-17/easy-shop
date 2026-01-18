import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware.ts";

/**
 * Role-based access control middleware
 * @param roles Allowed roles
 */
export const authorizeRoles = (...roles: Array<"user" | "service_provider" | "admin">) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
