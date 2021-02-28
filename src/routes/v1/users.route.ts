import { Router } from "express";
import { UsersController } from "../../controllers/users.controller";
import { auth_verifier } from "../../middlewares/auth.verifier.middleware";
import { admin_verifier } from "../../middlewares/admin.verifier.middleware";

const router = Router();
const usersController = new UsersController();

// user routes
router.post("/test", usersController.test);
router.post(
  "/signup",
  usersController.signup
);
// user details routes
router.get("/user", auth_verifier, usersController.get_user_details);
// get users for admin
router.get("/users", auth_verifier, admin_verifier, usersController.get_users);

export default router;
