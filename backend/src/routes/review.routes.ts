import { Router } from "express";
import { addReview, getProductReviews, getUserPurchasedProducts } from "../controllers/review.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { authorizeRoles } from "../middleware/role.middleware.ts";

const router = Router();

router.post(
  "/products/:productId/reviews",
  authMiddleware,
  authorizeRoles("user", "service_provider", "admin"),
  addReview
);

router.get(
  "/products/:productId/reviews",
  getProductReviews
);

router.get(
  "/user/purchased-products",
  authMiddleware,
  authorizeRoles("user", "service_provider", "admin"),
  getUserPurchasedProducts
);

export default router;