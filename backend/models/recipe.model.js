import mongoose from "mongoose";

// example recipe data:
// example = {
//     "title": "Nasi Lemak",
//     "image": "url or path",
//     "ingredients": [
//         {
//             name: "rice",
//             quantity: 1,
//             unit: "cup"
//         },
//         {
//             name: "chicken",
//             quantity: 1,
//             unit: "piece"
//         }
//     ],
//     instructions: [
//         "cook rice",
//         "cook chicken",
//         "serve"
//     ],
//     tags: [
//         "asian",
//         "spicy"
//     ],
//     cookingHour: 1,
//     servings: 2
// }

const recipeSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: Array,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    cookingHour: {
        type: Number,
        required: true
    },
    servings: {
        type: Number,
        required: true
    }
});

export const Recipe = mongoose.model("Recipe", recipeSchema);