import dotenv from "dotenv";

dotenv.config();


export const ENV_VARS = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    ADMIN_KEY: process.env.ADMIN_KEY,
    MOD_KEY: process.env.MOD_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV
}