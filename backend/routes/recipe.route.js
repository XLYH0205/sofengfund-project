import express from "express";
import { getAllRecipes, getUserRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe, searchRecipes } from "../controllers/recipe.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { ROLES } from "../constants/roles.constants.js";

const router = express.Router();

router.post('/', protectRoute(ROLES.USER), createRecipe);

router.get('/', getAllRecipes);

router.get('/search', searchRecipes);

router.get('/:uid', protectRoute(ROLES.USER, ROLES.MOD, ROLES.ADMIN), getUserRecipes);

router.get('/:id', getRecipeById);

router.put('/:id', protectRoute(ROLES.USER, ROLES.MOD), updateRecipe);

router.delete('/:id', protectRoute(ROLES.USER, ROLES.MOD), deleteRecipe);

export default router;