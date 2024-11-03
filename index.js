import express from "express";
import userRouter from "./routers/userRouter.js";
import recipesRouter from "./routers/recipeRouter.js";
import commentsRouter from "./routers/commentsRouter.js";
import likesRouter from "./routers/likesRouter.js";
import dislikesRouter from "./routers/dislikesRouter.js";
import favoritesRouter from "./routers/favoritesRouter.js";
import logger from "./middleware/loggerMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import {fileURLToPath} from 'url';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import notFoundMiddleware from "./middleware/notFound.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// Helper Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cors());


//{ Routers Middleware (For Nesting the Routes)
app.use("/users",userRouter);
app.use("/recipes", recipesRouter);
app.use("/recipes/:recipe_id/comments", commentsRouter);
app.use("/recipes/:recipe_id/likes", likesRouter);
app.use("/recipes/:recipe_id/dislikes", dislikesRouter);
app.use("/f", favoritesRouter);

// }

//Server testing endpoint 
app.get("/healthz", (req, res) => {
  res.json({msg:"Hello World"});
});


// Checking for the wrong routes
app.all('*',notFoundMiddleware);
app.use(errorHandler);

export const server = app.listen(process.env.PORT, () => {
  console.log("Server is Running on Port:",process.env.PORT);
});
