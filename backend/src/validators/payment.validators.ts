import { z } from "zod";

export const shippingAddressSchema = z.object({
  body: z.object({
    items: z.array(z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
      quantity: z.number().min(1, "Quantity must be at least 1")
    })).min(1, "At least one item is required"),
    
    shippingAddress: z.object({
      fullName: z
        .string()
        .min(2, "Full name must be at least 2 characters")
        .max(50, "Full name must be at most 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
      
      phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit Indian mobile number"),
      
      address: z
        .string()
        .min(10, "Address must be at least 10 characters")
        .max(200, "Address must be at most 200 characters"),
      
      pincode: z
        .string()
        .regex(/^[1-9][0-9]{5}$/, "Pincode must be a valid 6-digit Indian postal code")
    })
  })
});