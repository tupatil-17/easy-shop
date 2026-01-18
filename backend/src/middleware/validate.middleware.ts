import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import type { ZodTypeAny } from "zod";

/* =====================
   GENERIC VALIDATORS
===================== */

export const zodValidate =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      let parsed;
      try {
        parsed = schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        }) as { body?: any; query?: any; params?: any };
      } catch (zodError) {
        throw zodError; // Re-throw to be caught by outer catch for response
      }

      // Update request with parsed data (trimmed, transformed, etc.)
      // We use a safe way to overwrite these properties if they are getters in Express 5
      if (parsed.body) {
        req.body = parsed.body;
      }
      if (parsed.query) {
        try {
          req.query = parsed.query;
        } catch (e) {
          // If direct assignment fails (Express 5 read-only getter), use defineProperty
          Object.defineProperty(req, 'query', {
            value: parsed.query,
            writable: true,
            configurable: true,
            enumerable: true
          });
        }
      }
      if (parsed.params) {
        try {
          req.params = parsed.params;
        } catch (e) {
          Object.defineProperty(req, 'params', {
            value: parsed.params,
            writable: true,
            configurable: true,
            enumerable: true
          });
        }
      }

      next();
    } catch (error: any) {
      console.error("Validation Middleware Error:", error);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: JSON.stringify(error.errors?.map((err: any) => ({
          path: err.path.join("."),
          message: err.message,
        })) || error.message),
      });
    }
  };

export const validateObjectId = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[paramName];

    if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({
        message: `Invalid ${paramName}`,
      });
    }

    next();
  };
};

export const validateRequiredFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = fields.filter(
      (field) => !req.body[field]
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields,
      });
    }

    next();
  };
};

/* =====================
   AUTH VALIDATORS
===================== */

export const validateRegister = validateRequiredFields([
  "username",
  "email",
  "password",
]);

export const validateLogin = validateRequiredFields([
  "email",
  "password",
]);

export const validateRefreshToken = validateRequiredFields([
  "refreshToken",
]);
