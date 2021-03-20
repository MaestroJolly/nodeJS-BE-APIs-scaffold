import auth_route from "./auth.route";
import users_route from "./users.route";
import { Router } from "express";

const router = Router();

//auth routes
router.use(auth_route);

// users route
router.use(users_route);


export default router;