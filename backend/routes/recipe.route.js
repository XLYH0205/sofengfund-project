import express from "express";
import { getAllRecipes, getUserRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } from "../controllers/recipe.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/', protectRoute('user'), createRecipe);

router.get('/', getAllRecipes);

router.get('/:uid', protectRoute('user'), getUserRecipes);

router.get('/:id', getRecipeById);

router.put('/:id', protectRoute('user', 'moderator'), updateRecipe);

router.delete('/:id', protectRoute('user', 'moderator'), deleteRecipe);

export default router;