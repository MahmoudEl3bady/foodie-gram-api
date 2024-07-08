import express from "express";
import {
  addLike,
  deleteLike,
  likeCounts,
  isLiked,
} from "../controllers/likesController.js";

const router = express.Router({ mergeParams: true });

router.post("/", addLike);
router.delete("/", deleteLike);
router.get("/count", likeCounts);
router.get("/:userId", isLiked);

export default router;
