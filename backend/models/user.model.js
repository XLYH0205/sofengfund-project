import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    recipes: {
        type: Array,
        default: []
    },
    favorites: {
        type: Array,
        default: []
    }
});

export const User = mongoose.model("User", userSchema);