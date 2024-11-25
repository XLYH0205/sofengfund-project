import mongoose from "mongoose";

const modSchema = new mongoose.Schema({
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
    }
});

export const Moderator = mongoose.model("Moderator", modSchema);