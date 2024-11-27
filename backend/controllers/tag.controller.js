import { Tag } from "../models/tag.model.js";

/**
 * @route   POST /api/v1/tag/create
 * @desc    Create a new tag
 * @access  Admin
 */
export const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Tag name is required'
            });
        }

        const existingTag = await Tag.findOne({ name: name.toLowerCase() });
        if (existingTag) {
            return res.status(400).json({
                success: false,
                message: 'Tag already exists'
            });
        }

        const newTag = new Tag({ name });
        await newTag.save();

        res.status(201).json({
            success: true,
            message: 'Tag created successfully',
            data: newTag
        });
    } catch (error) {
        console.error('Error creating tag:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating tag'
        });
    }
};

/**
 * @route   GET /api/v1/tag
 * @desc    Get all tags
 * @access  Any user
 */
export const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find().sort({ name: 1 });
        
        res.json({
            success: true,
            data: tags
        });
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tags'
        });
    }
};

/**
 * @route   PUT /api/v1/tag/:tagId
 * @desc    Update a tag
 * @access  Admin
 */
export const updateTag = async (req, res) => {
    try {
        const { tagId } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Tag name is required'
            });
        }

        const existingTag = await Tag.findOne({ 
            name: name.toLowerCase(),
            _id: { $ne: tagId }
        });
        
        if (existingTag) {
            return res.status(400).json({
                success: false,
                message: 'Tag name already exists'
            });
        }

        const tag = await Tag.findByIdAndUpdate(
            tagId,
            { name },
            { new: true }
        );

        if (!tag) {
            return res.status(404).json({
                success: false,
                message: 'Tag not found'
            });
        }

        res.json({
            success: true,
            data: tag
        });
    } catch (error) {
        console.error('Error updating tag:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating tag'
        });
    }
};

/**
 * @route   DELETE /api/v1/tag/:tagId
 * @desc    Delete a tag
 * @access  Admin
 */
export const deleteTag = async (req, res) => {
    try {
        const { tagId } = req.params;
        const tag = await Tag.findByIdAndDelete(tagId);

        if (!tag) {
            return res.status(404).json({
                success: false,
                message: 'Tag not found'
            });
        }

        res.json({
            success: true,
            message: 'Tag deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting tag:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting tag'
        });
    }
};
