import { Router } from "express";
import { login, register, logout, refreshAccessToken, getCurrentUser, verifyEmail, verifyLoginOTP } from "../controllers/auth.controller.ts";
import { zodValidate } from "../middleware/validate.middleware.ts";
import {
  registerSchema,
  loginSchema,
} from "../validators/user.validators.ts";

const router = Router();

router.post("/register", zodValidate(registerSchema), register);
router.post("/verify-email", verifyEmail);
router.post("/login", zodValidate(loginSchema), login);
router.post("/verify-login", verifyLoginOTP);
router.post("/logout", logout);
router.post("/refresh-token", refreshAccessToken);
router.get("/me", getCurrentUser);

export default router;
