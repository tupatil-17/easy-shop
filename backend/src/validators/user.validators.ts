import { z } from "zod";

/* ----------------- COMMON FIELDS ----------------- */
const email = z
  .string()
  .email("Invalid email address")
  .max(100, "Email too long");

const username = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username must be at most 30 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username can contain letters, numbers, underscore only and no spaces");

const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(50, "Password too long")
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
    "Password must contain uppercase, lowercase and a number"
  );

/* ----------------- REGISTER ----------------- */
export const registerSchema = z.object({
  body: z.object({
    email,
    username,
    password,
  }),
});

/* ----------------- LOGIN ----------------- */
export const loginSchema = z.object({
  body: z.object({
    email,
    password,
  }),
});

/* ----------------- SERVICE PROVIDER APPLY ----------------- */
export const applyServiceProviderSchema = z.object({
  body: z.object({
    aadhaarNumber: z
      .string()
      .length(12, "Aadhaar must be exactly 12 digits")
      .regex(/^\d+$/, "Aadhaar must contain only digits"),

    panNumber: z
      .string()
      .length(10, "PAN must be exactly 10 characters")
      .regex(
        /^[A-Z]{5}[0-9]{4}[A-Z]$/,
        "Invalid PAN format"
      ),

    address: z
      .string()
      .min(10, "Address must be at least 10 characters")
      .max(200, "Address too long"),
  }),
});

/* ----------------- PRODUCT ID PARAM ----------------- */
export const productIdParamSchema = z.object({
  params: z.object({
    productId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID format"),
  }),
});
