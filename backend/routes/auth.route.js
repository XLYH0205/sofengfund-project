import express from "express";
import { login, logout, signup, initGuest, authCheck } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.get("/guest", initGuest)

router.get("/check", protectRoute(ROLES.ADMIN, ROLES.MOD, ROLES.USER, ROLES.GUEST), authCheck);

router.post("/signup/:role", signup)

router.post("/login/:role", login)

router.post("/logout/", logout)


export default router;