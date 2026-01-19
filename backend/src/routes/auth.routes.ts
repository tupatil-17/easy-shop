import { Router } from "express";
import { login, register, logout, refreshAccessToken, getCurrentUser } from "../controllers/auth.controller";
import { zodValidate } from "../middleware/validate.middleware";
import {
  registerSchema,
  loginSchema,
} from "../validators/user.validators";

const router = Router();

router.post("/register", zodValidate(registerSchema), register);
router.post("/login", zodValidate(loginSchema), login);
router.post("/logout", logout);
router.post("/refresh", refreshAccessToken);
router.get("/me", getCurrentUser);

export default router;
