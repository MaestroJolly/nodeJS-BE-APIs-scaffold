import { Router } from "express";
import { UsersController } from "@controllers/index";
import {
  auth_verifier,
  admin_verifier,
  userPayloadValidator,
} from "@middlewares/index";

const router = Router();
const usersController = new UsersController();

// user routes
router.post("/test", usersController.test);
router.post("/register", userPayloadValidator, usersController.register);
// user details routes
router.get("/user", auth_verifier, usersController.get_user_details);
// get users for admin
router.get("/users", auth_verifier, admin_verifier, usersController.get_users);

export default router;
