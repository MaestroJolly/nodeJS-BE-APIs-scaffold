import { Router } from "express";
import { AuthController } from "@controllers/index";
import { auth_verifier } from "@middlewares/index";

const router = Router();

const authController = new AuthController();

// auth routes
router.post("/login", authController.login);
router.put("/logout", auth_verifier, authController.logout);
router.post("/forgotpassword", authController.send_forgot_password);
router.put("/changepassword/:token", authController.change_password);

export default router;
