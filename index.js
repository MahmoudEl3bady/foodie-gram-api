import express from "express";
import recipesRouter from "./routers/recipeRouter.js";
import commentsRouter from "./routers/commentsRouter.js";
import likesRouter from "./routers/likesRouter.js";
import dislikesRouter from "./routers/dislikesRouter.js";
import favoritesRouter from "./routers/favoritesRouter.js";
import logger from "./middleware/loggerMiddleware.js";
import unfound from "./middleware/unfound.js";
import errorHandler from "./middleware/error_handler.js";

const app = express();

// Helper Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

//{ Routers Middleware (For Nesting the Routes)
app.use("/recipes", recipesRouter);
app.use("/recipes/:recipeId/comments", commentsRouter);
app.use("/recipes/:recipeId/likes", likesRouter);
app.use("/recipes/:recipeId/dislikes", dislikesRouter);
app.use("/recipes/:recipeId/favorites", favoritesRouter);

// }

app.use(unfound);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8000, () => {
  console.log("Server is Running");
});
