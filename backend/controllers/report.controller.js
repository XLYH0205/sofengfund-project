import mongoose from "mongoose";
import { Report } from "../models/report.model.js";

/**
 * @route   POST /api/v1/report/create
 * @desc    Create a new report for a recipe
 * @access  Any user
 */
export const createReport = async (req, res) => {
    try {
        const { reporterId, reportedRecipeId, reason, description } = req.body;

        const newReport = new Report({
            reporterId,
            reportedRecipeId,
            reason,
            description,
            status: 'pending'
        });

        await newReport.save();

        res.status(201).json({
            success: true,
            message: 'Report submitted successfully',
            data: newReport
        });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting report'
        });
    }
};

/**
 * @route   GET /api/v1/report
 * @desc    Get all reports (for admin/moderator dashboard)
 * @access  Moderator
 */
export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find()
            .populate('reporterId', 'username')
            .populate('reportedRecipeId', 'title')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: reports
        });
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching reports'
        });
    }
};

/**
 * @route   GET /api/v1/report/:reportId
 * @desc    Get a single report by ID
 * @access  Moderator
 */
export const getReportById = async (req, res) => {
    try {
        const { reportId } = req.params;
        const report = await Report.findById(reportId)
            .populate('reporterId', 'username')
            .populate('reportedRecipeId', 'title');

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        res.json({
            success: true,
            data: report
        });
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching report'
        });
    }
};

/**
 * @route   PUT /api/v1/report/:reportId/status
 * @desc    Update report status (pending/resolved/rejected)
 * @access  Moderator
 */
export const updateReportStatus = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { status } = req.body;

        const report = await Report.findByIdAndUpdate(
            reportId,
            { status },
            { new: true }
        )
        .populate('reporterId', 'username')
        .populate('reportedRecipeId', 'title');

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        res.json({
            success: true,
            data: report
        });
    } catch (error) {
        console.error('Error updating report status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating report status'
        });
    }
};
