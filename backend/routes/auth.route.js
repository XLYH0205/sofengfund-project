import express from "express";
import { login, logout, signup, guestUser } from "../controllers/auth.controller.js";

const router = express.Router();

// role = guest, user, admin, moderator

router.get("/guest", guestUser)

router.post("/signup/:role", signup)

router.post("/login/:role", login)

router.post("/logout/", logout)

export default router;