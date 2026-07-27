import { Router } from "express";
import * as methods from "../controller/authController.ts";
import { authentication, authorization } from "../middleware/authMiddleware.ts";
const router = Router();

router.post("/signup", methods.signUp);

router.post("/signin", methods.signIn);

router.get("/signout", methods.signOut);

router.get("/profile", authentication, methods.getProfile);

router.get("/admin-only", authorization, methods.getAdminProfile);

export default router;
