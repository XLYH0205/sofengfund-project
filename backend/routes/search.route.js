import express from "express";
import { searchByName, searchByTags, searchByIngredients } from "../controllers/search.controller.js";

const router = express.Router();

router.get('/byname/:query', searchByName);
router.get('/bytags/:query', searchByTags);
router.get('/byingredients/:query', searchByIngredients);

export default router;