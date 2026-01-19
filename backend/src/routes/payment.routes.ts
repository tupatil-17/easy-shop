import { Router } from "express";
import { createPaymentIntent, confirmPayment, getUserOrders } from "../controllers/payment.controller";
import { authenticate } from "../middleware/auth.middleware";
import { zodValidate } from "../middleware/validate.middleware";
import { shippingAddressSchema } from "../validators/payment.validators";

const router = Router();

router.post("/create-payment-intent", authenticate, zodValidate(shippingAddressSchema), createPaymentIntent);
router.post("/confirm-payment", authenticate, confirmPayment);
router.get("/user-orders", authenticate, getUserOrders);

export default router;