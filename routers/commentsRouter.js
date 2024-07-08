import express from "express";
import {
  getRecipeComments,
  addRecipeComment,
  deleteRecipeComment,
  updateRecipeComment,
} from "../controllers/recipeCommentsController.js";

const router = express.Router({ mergeParams: true });

//  Root /recipes/:recipeId/comments
router.get("/", getRecipeComments);
router.post("/", addRecipeComment);
router.put("/:id", updateRecipeComment);
router.delete("/:id", deleteRecipeComment);

export default router;
