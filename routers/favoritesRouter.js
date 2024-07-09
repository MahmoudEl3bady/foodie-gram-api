import express from "express";
import {
  addFavorite,
  deleteFavorite,
  favoriteCounts,
  isFavorite,
} from "../controllers/favsController.js";

const router = express.Router({ mergeParams: true });

router.post("/", addFavorite);
router.delete("/", deleteFavorite);
router.get("/count", favoriteCounts);
router.get("/:userId", isFavorite);

export default router;
