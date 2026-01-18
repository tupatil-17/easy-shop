import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";

export const zodValidate =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Only read the properties we need for validation
      const { body, params, query } = req;

      schema.parse({
        body,      // passing only necessary data
        params,    // passing only necessary data
        query,     // passing only necessary data
      });

      next(); // Validation passed, proceed to next middleware
    } catch (error: any) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }
  };
