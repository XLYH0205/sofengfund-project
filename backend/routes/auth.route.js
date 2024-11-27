import express from "express";
import { login, logout, signup, initGuest, authCheck } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/guest", initGuest)

// router.get("/authCheck", protectRoute(''), authCheck);

router.post("/signup/:role", signup)

router.post("/login/:role", login)

router.post("/logout/", logout)


export default router;