import express from "express";
import { 
    createReport, 
    getAllReports, 
    getReportById, 
    updateReportStatus 
} from "../controllers/report.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

// Report creation and management routes
router.post('/create', protectRoute(ROLES.USER), createReport);
router.get('/', protectRoute(ROLES.MOD), getAllReports);
router.get('/:reportId', protectRoute(ROLES.MOD), getReportById);
router.put('/:reportId/status', protectRoute(ROLES.MOD), updateReportStatus);

export default router;
