import express from "express";
import {
  getRecipes,
  getOneRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipesController.js";
import authToken from "../middleware/authToken.js";



const router = express.Router();
router.use(authToken);

router.get("/", getRecipes);
router.get("/:id", getOneRecipe);
router.post("/", addRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

// TODO :Get current user recipes to be shown in his profile.



export default router;


