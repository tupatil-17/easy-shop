import { Router } from "express";
import {
  getServiceProviderApplications,
  approveServiceProvider,
  rejectServiceProvider,
  getAllUsers,
  deleteUser,
  getPendingProducts,
  approveProduct,
  rejectProduct,
  deleteProduct,
} from "../controllers/admin.controller.ts";

import { authenticate } from "../middleware/auth.middleware.ts";
import { authorizeRoles } from "../middleware/role.middleware.ts";
import { validateObjectId } from "../middleware/validate.middleware.ts";

const router = Router();

router.get(
  "/service-provider-applications",
  authenticate,
  authorizeRoles("admin"),
  getServiceProviderApplications
);

router.patch(
  "/approve-service-provider/:id",
  authenticate,
  authorizeRoles("admin"),
  validateObjectId("id"),
  approveServiceProvider
);

router.patch(
  "/reject-service-provider/:id",
  authenticate,
  authorizeRoles("admin"),
  validateObjectId("id"),
  rejectServiceProvider
);

router.get(
  "/pending-products",
  authenticate,
  authorizeRoles("admin"),
  getPendingProducts
);

router.patch(
  "/approve-product/:id",
  authenticate,
  authorizeRoles("admin"),
  validateObjectId("id"),
  approveProduct
);

router.patch(
  "/reject-product/:id",
  authenticate,
  authorizeRoles("admin"),
  validateObjectId("id"),
  rejectProduct
);

router.delete(
  "/products/:id",
  authenticate,
  authorizeRoles("admin"),
  validateObjectId("id"),
  deleteProduct
);


router.get(
  "/users",
  authenticate,
  authorizeRoles("admin"),
  getAllUsers
);

router.delete(
  "/users/:id",
  authenticate,
  authorizeRoles("admin"),
  validateObjectId("id"),
  deleteUser
);

export default router;
