import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  applyForServiceProvider,
  getCart,
  addToCart,
  removeFromCart,
  getFavourites,
  addToFavourites,
  removeFromFavourites,
} from "../controllers/user.controller.ts";

import { authMiddleware } from "../middleware/auth.middleware.ts";
import { authorizeRoles } from "../middleware/role.middleware.ts";
import { upload } from "../middleware/upload.middleware.ts";
import { validateObjectId } from "../middleware/validate.middleware.ts";
import { zodValidate } from "../middleware/validate.middleware.ts";
import {
  applyServiceProviderSchema,
  productIdParamSchema,
} from "../validators/user.validators.ts";

const router = Router();

/* ---------- Profile ---------- */
router.get(
  "/profile",
  authMiddleware,
  authorizeRoles("user", "service_provider", "admin"),
  getUserProfile
);

router.put(
  "/profile",
  authMiddleware,
  authorizeRoles("user", "service_provider", "admin"),
  updateUserProfile
);

/* ---------- Apply Service Provider ---------- */
router.post(
  "/apply-service-provider",
  authMiddleware,
  authorizeRoles("user"),
  upload.fields([
    { name: "aadhaarCardPhoto", maxCount: 1 },
    { name: "panCardPhoto", maxCount: 1 },
  ]),
  zodValidate(applyServiceProviderSchema),
  applyForServiceProvider
);

/* ---------- Cart ---------- */
router.get(
  "/cart",
  authMiddleware,
  authorizeRoles("user", "service_provider", "admin"),
  getCart
);

router.post(
  "/cart/:productId",
  authMiddleware,
  authorizeRoles("user", "service_provider", "admin"),
  validateObjectId("productId"),
  zodValidate(productIdParamSchema),
  addToCart
);

router.delete(
  "/cart/:productId",
  authMiddleware,
  authorizeRoles("user", "service_provider", "admin"),
  validateObjectId("productId"),
  zodValidate(productIdParamSchema),
  removeFromCart
);

/* ---------- Favourites ---------- */
router.get(
  "/favourites",
  authMiddleware,
  authorizeRoles("user", "service_provider", "admin"),
  getFavourites
);

router.post(
  "/favourites/:productId",
  authMiddleware,
  authorizeRoles("user", "service_provider", "admin"),
  validateObjectId("productId"),
  zodValidate(productIdParamSchema),
  addToFavourites
);

router.delete(
  "/favourites/:productId",
  authMiddleware,
  authorizeRoles("user", "service_provider", "admin"),
  validateObjectId("productId"),
  zodValidate(productIdParamSchema),
  removeFromFavourites
);

export default router;
