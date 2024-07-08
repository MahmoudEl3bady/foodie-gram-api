import express from "express";
const app = express();
import recipesRouter from "./routers/recipeRouter.js";
import interactionsRouter from "./routers/interactionsRouter.js";
import logger from "./middleware/loggerMiddleware.js";
import unfound from "./middleware/unfound.js";
import errorHandler from "./middleware/error_handler.js";



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
// app.use(express.urlencoded({ extended: true }));
app.use("/recipes", recipesRouter);
app.use('/interactions',interactionsRouter);



app.use(unfound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8000,()=>{
    console.log("Server is Running");
});