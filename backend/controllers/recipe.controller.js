import mongoose from "mongoose";
import { Recipe } from "../models/recipe.model.js"
import { User } from "../models/user.model.js";

export async function getAllRecipes(req, res) {
    try {
        const recipes = await Recipe.find({});
        res.status(200).json({
            success: true,
            data: recipes
        })        
    } catch (error) {
        console.log("Error in getRecipes controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })        
    }
}

export async function getUserRecipes(req, res) {    
    const { uid } = req.params;

    try {
        const recipes = await Recipe.find({ author: uid });  
            
        res.status(200).json({
            success: true,
            data: recipes
        })      
    } catch (error) {
        console.log("Error in getUserRecipes controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })        
    }
}

export async function getRecipeById(req, res) {
    const { id } = req.params;
    
    try {
        const recipe = await Recipe.findById(id);
        res.status(200).json({
            success: true,
            data: recipe
        })        
    } catch (error) {
        console.log("Error in getRecipeById controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })        
    }
}

export async function createRecipe(req, res) {
    const recipe = req.body;
    
    // check missing fields
    if (
        !recipe.title ||
        !recipe.image ||
        !recipe.ingredients ||
        !recipe.instructions ||
        !recipe.tags ||
        !recipe.cookingHour ||
        !recipe.servings
    ) {
        return res.status(400).json({ 
            success: false,
            message: "Missing required fields"
         });
    }

    // create new Recipe into database
    const newRecipe = new Recipe(recipe);
    // get the user id from the token
    const userId = req.account._id;
    newRecipe.author = userId;

    try {
        await newRecipe.save();

        res.status(200).json({
            success: true,
            data: newRecipe
        })        
    } catch (error) {
        console.log("Error in createRecipe controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })        
    }
}

export async function updateRecipe(req, res) {
    const { id } = req.params;
    const recipe = req.body;
    
    // check missing fields
    if (
        !recipe.title ||
        !recipe.image ||
        !recipe.ingredients ||
        !recipe.instructions ||
        !recipe.tags ||
        !recipe.cookingHour ||
        !recipe.servings
    ) {
        return res.status(400).json({ 
            success: false,
            message: "Missing required fields"
         });
    }
        
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, { new: true });
        res.status(200).json({
            success: true,
            data: updatedRecipe
        })        
    } catch (error) {
        console.log("Error in updateRecipe controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })        
    }
}

export async function deleteRecipe(req, res) {
    const { id } = req.params;
    
    try {
        // delete recipe
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Recipe deleted successfully"
        })        

    } catch (error) {
        console.log("Error in deleteRecipe controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })        
    }
}