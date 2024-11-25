import express from "express";
import { updateProfile } from "../controllers/account.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.put("/:id", protectRoute('user', 'moderator', 'admin'), updateProfile)

export default router;