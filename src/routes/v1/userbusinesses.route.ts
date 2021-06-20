import { Router } from "express";
import { UserBusinessesController } from "@controllers/index";
import { auth_verifier, admin_verifier } from "@middlewares/index";

const router = Router();
const userBusinessesController = new UserBusinessesController();

// get users for admin
router.get(
  "/businesses",
  auth_verifier,
  admin_verifier,
  userBusinessesController.get_userbusinesses
);

export default router;
