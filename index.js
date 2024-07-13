import express from "express";
import usersRouter from "./routers/userRouter.js";
import recipesRouter from "./routers/recipeRouter.js";
import commentsRouter from "./routers/commentsRouter.js";
import likesRouter from "./routers/likesRouter.js";
import dislikesRouter from "./routers/dislikesRouter.js";
import favoritesRouter from "./routers/favoritesRouter.js";
import logger from "./middleware/loggerMiddleware.js";
import unfound from "./middleware/unfound.js";
import errorHandler from "./middleware/error_handler.js";
import db from './db/db.js'
const app = express();

// Helper Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

//{ Routers Middleware (For Nesting the Routes)
app.use("/users",usersRouter);
app.use("/recipes", recipesRouter);
app.use("/recipes/:recipe_id/comments", commentsRouter);
app.use("/recipes/:recipe_id/likes", likesRouter);
app.use("/recipes/:recipe_id/dislikes", dislikesRouter);
app.use("/favorites", favoritesRouter);

// }

app.use(unfound);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({msg:"Hello World"});
});

app.get("/u", async (req, res) => {
  try {
    const data = await db.select("*").from("users");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8000, () => {
  console.log("Server is Running");
});
