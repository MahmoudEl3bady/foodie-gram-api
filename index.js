import express from "express";
import userRouter from "./routers/userRouter.js";
import recipesRouter from "./routers/recipeRouter.js";
import commentsRouter from "./routers/commentsRouter.js";
import likesRouter from "./routers/likesRouter.js";
import dislikesRouter from "./routers/dislikesRouter.js";
import favoritesRouter from "./routers/favoritesRouter.js";
import logger from "./middleware/loggerMiddleware.js";
import unfound from "./middleware/unfound.js";
import errorHandler from "./middleware/error_handler.js";
import db from './db/db.js'
import {fileURLToPath} from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// Helper Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

//{ Routers Middleware (For Nesting the Routes)
app.use("/users",userRouter);
app.use("/recipes", recipesRouter);
app.use("/recipes/:recipe_id/comments", commentsRouter);
app.use("/recipes/:recipe_id/likes", likesRouter);
app.use("/recipes/:recipe_id/dislikes", dislikesRouter);
app.use("/f", favoritesRouter);

// }

// app.use(unfound);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({msg:"Hello World"});
});

app.get("/uuu", async (req, res) => {
  try {
    const data = await db.select("*").from("users");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
console.log(process.env.PORT)
export const server = app.listen(8000, () => {
  console.log("Server is Running");
});
