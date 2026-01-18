import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  logProductView,
  getRecommendedProducts,
  getLastViewedProducts,
} from "../controllers/product.controller.ts";

import { authenticate, optionalAuthenticate } from "../middleware/auth.middleware.ts";
import { authorizeRoles } from "../middleware/role.middleware.ts";
import { validateObjectId } from "../middleware/validate.middleware.ts";
import { upload } from "../middleware/upload.middleware.ts";

const router = Router();


router.get("/", getAllProducts);
router.get("/recommended", optionalAuthenticate, getRecommendedProducts);
router.get("/last-viewed", authenticate, getLastViewedProducts);
router.get("/:id", validateObjectId("id"), getProductById);
router.post("/:id/view", authenticate, validateObjectId("id"), logProductView);


router.post(
  "/",
  authenticate,
  authorizeRoles("service_provider"),
  upload.array("images", 5), 
  addProduct
);

router.get(
  "/service-provider/me",
  authenticate,
  authorizeRoles("service_provider"),
  getMyProducts
);

router.patch(
  "/:id",
  authenticate,
  authorizeRoles("service_provider"),
  validateObjectId("id"),
  upload.array("images", 5),
  updateProduct
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("service_provider"),
  validateObjectId("id"),
  deleteProduct
);

export default router;
