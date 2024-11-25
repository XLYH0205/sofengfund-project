import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js"
import accountRoutes from "./routes/account.route.js"
import recipeRoutes from "./routes/recipe.route.js"
import searchRoutes from "./routes/search.route.js"
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser()); // will allow us to parse cookies in protectRoute

app.use("/api/v1/auth", authRoutes)

app.use("/api/v1/account", accountRoutes)

app.use("/api/v1/recipe", recipeRoutes)

// TODO: search route
app.use("/api/v1/search", searchRoutes)

const PORT = ENV_VARS.PORT;

app.listen(PORT, () => {
    console.log("Server is running on port http://localhost:" + PORT);
    connectDB();
});