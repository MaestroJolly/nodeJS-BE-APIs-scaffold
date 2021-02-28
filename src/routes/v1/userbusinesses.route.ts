import { Router } from "express";
import { UserBusinessesController } from "../../controllers/userbusinesses.controller";
import { auth_verifier } from "../../middlewares/auth.verifier.middleware";
import { admin_verifier } from "../../middlewares/admin.verifier.middleware";

const router = Router();
const userBusinessesController = new UserBusinessesController();

// get users for admin
router.get("/businesses", auth_verifier, admin_verifier, userBusinessesController.get_userbusinesses);

export default router;
