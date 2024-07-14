import express from "express";
import {
  addLike,
  deleteLike,
  likeCounts,
  
} from "../controllers/likesController.js";
import authToken from "../middleware/authToken.js";

const router = express.Router({ mergeParams: true });

router.use(authToken)

//Root : recipes/:recipeId/likes

router.post("/", addLike);  
router.delete("/", deleteLike);
router.get("/count", likeCounts);
// router.get("/:userId", isLiked);

export default router;
