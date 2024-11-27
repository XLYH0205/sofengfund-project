import express from "express";
import { 
    createTag,
    getAllTags,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js";

const router = express.Router();

router.post('/create', createTag);
router.get('/', getAllTags);
router.put('/:tagId', updateTag);
router.delete('/:tagId', deleteTag);

export default router;
