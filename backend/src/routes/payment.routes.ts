import { Router } from "express";
import { createPaymentIntent, confirmPayment, getUserOrders } from "../controllers/payment.controller.ts";
import { authenticate } from "../middleware/auth.middleware.ts";
import { zodValidate } from "../middleware/validate.middleware.ts";
import { shippingAddressSchema } from "../validators/payment.validators.ts";

const router = Router();

router.post("/create-payment-intent", authenticate, zodValidate(shippingAddressSchema), createPaymentIntent);
router.post("/confirm-payment", authenticate, confirmPayment);
router.get("/user-orders", authenticate, getUserOrders);

export default router;