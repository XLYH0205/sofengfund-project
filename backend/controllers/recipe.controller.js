import fs from "fs";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { Recipe } from "../models/recipe.model.js"
import { User } from "../models/user.model.js";

/**
 * @route   GET /api/v1/recipe/all
 * @desc    Get all recipes
 * @access  Public
 */
export async function getAllRecipes(req, res) {
    try {
        const temp = cloudinary.url("cld-sample-5")
        console.log(temp);

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

/**
 * @route   GET /api/v1/recipe/search?name=<replace here>&tags=<replace here>&ingredients=<replace here>
 * @desc    Search for recipes by name, tags, or ingredients
 * @access  Public
 */
export async function searchRecipes(req, res) {
    try {
        const { name, tags, ingredients } = req.query;

        // Build query object for MongoDB
        const query = {};

        if (name) {
            query.title = { $regex: name, $options: 'i' };
        }

        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
            query.tags = { $in: tagArray };
        }

        if (ingredients) {
            const ingredientArray = ingredients.split(',').map(ing => ing.trim().toLowerCase());
            query['ingredients.name'] = {
                $in: ingredientArray
            };
        }

        const recipes = await Recipe.find(query);

        return res.status(200).json({
            success: true,
            count: recipes.length,
            data: recipes
        });
    } catch (error) {
        console.log("Error in searchRecipes controller", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

/**
 * @route   GET /api/v1/recipe/:uid
 * @desc    Get recipes by user ID
 * @access  User, Moderator, Administrator
 */
export async function getUserRecipes(req, res) {
    const { uid } = req.params;

    try {
        // check if user exists
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
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

/**
 * @route   GET /api/v1/recipe/:id
 * @desc    Get a recipe by ID
 * @access  Public
 */
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


/**
 * @route   POST /api/v1/recipe
 * @desc    Create a new recipe
 * @access  User
 */
export async function createRecipe(req, res) {
    let recipe = req.body;
    const imgFile = req.file;

    // check missing fields
    if (
        !recipe.title ||
        !imgFile ||
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

    // Edit
    // if (recipe.image){
    //     await cloudinary.uploader.destroy(recipe.image.split("/").pop().split(".")[0]);
    // }
    
    try {
        // get the image id(display_name) from Cloudinary
        const uploadedResponse = await cloudinary.uploader.upload(imgFile.path, { folder: "recipes" });
        fs.unlinkSync(imgFile.path); // delete the img from public/images
        recipe.image = uploadedResponse.display_name;
    
        // get the user id from the token
        const userId = req.account._id;
        recipe.author = new mongoose.Types.ObjectId(userId);
    
        // create new Recipe into database
        const newRecipe = new Recipe(recipe);
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

/**
 * @route   PUT /api/v1/recipe/:id
 * @desc    Update a recipe by ID
 * @access  User, Moderator
 */
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

/**
 * @route   DELETE /api/v1/recipe/:id
 * @desc    Delete a recipe by ID
 * @access  User, Moderator
 */
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