import express from "express";
import { 
    createReport, 
    getAllReports, 
    getReportById, 
    updateReportStatus 
} from "../controllers/report.controller.js";

const router = express.Router();

// Report creation and management routes
router.post('/create', createReport);
router.get('/', getAllReports);
router.get('/:reportId', getReportById);
router.put('/:reportId/status', updateReportStatus);

export default router;
