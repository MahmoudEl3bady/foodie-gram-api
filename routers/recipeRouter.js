import express from "express";
import {
  getRecipes,
  getOneRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipesController.js";



const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getOneRecipe);
router.post("/", addRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;


