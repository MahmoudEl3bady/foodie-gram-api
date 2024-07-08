import express from "express";
const app = express();
import recipesRouter from "./routers/recipeRouter.js";
import logger from "./middleware/loggerMiddleware.js";


app.use(express.json());
app.use(logger);
// app.use(express.urlencoded({ extended: true }));
app.use("/recipes", recipesRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8000,()=>{
    console.log("Server is Running");
});