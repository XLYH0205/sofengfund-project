import express from "express";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth.route.js"
import accountRoutes from "./routes/account.route.js"
import recipeRoutes from "./routes/recipe.route.js"
import reportRoutes from "./routes/report.route.js"
import tagRoutes from "./routes/tag.route.js"
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();

cloudinary.config({
    cloud_name: ENV_VARS.CLOUDINARY_CLOUD_NAME,
    api_key: ENV_VARS.CLOUDINARY_API_KEY,
    api_secret: ENV_VARS.CLOUDINARY_API_SECRET
})

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser()); // will allow us to parse cookies in protectRoute

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/account", accountRoutes)
app.use("/api/v1/recipe", recipeRoutes) //TODO: handle images with cloudinary (Lee)
app.use("/api/v1/report", reportRoutes)
app.use("/api/v1/tag", tagRoutes)

const PORT = ENV_VARS.PORT;

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT);
    connectDB();
});