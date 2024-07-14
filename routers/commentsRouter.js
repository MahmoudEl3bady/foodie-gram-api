import express from "express";
import {
  getRecipeComments,
  addRecipeComment,
  deleteRecipeComment,
  updateRecipeComment,
} from "../controllers/recipeCommentsController.js";
import authToken from "../middleware/authToken.js";

const router = express.Router({ mergeParams: true });

router.use(authToken);

//  Root /recipes/:recipeId/comments
router.get("/", getRecipeComments);
router.post("/", addRecipeComment);
router.put("/:id", updateRecipeComment);
router.delete("/:id", deleteRecipeComment);

export default router;
