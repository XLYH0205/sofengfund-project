import express from "express";
import { updateProfile } from "../controllers/account.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { ROLES } from "../constants/roles.constants.js";
const router = express.Router();

router.put("/:id", protectRoute(ROLES.USER, ROLES.MOD, ROLES.ADMIN), updateProfile)

export default router;