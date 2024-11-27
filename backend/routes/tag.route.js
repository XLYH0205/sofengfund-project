import express from "express";
import { 
    createTag,
    getAllTags,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.post('/create', protectRoute(ROLES.ADMIN), createTag);
router.get('/', getAllTags);
router.put('/:tagId', protectRoute(ROLES.ADMIN), updateTag);
router.delete('/:tagId', protectRoute(ROLES.ADMIN), deleteTag);

export default router;
