import express from "express";
import {
  addFavorite,
  deleteFavorite,
  getUserFavorites
} from "../controllers/favsController.js";

const router = express.Router({ mergeParams: true });

router.get("/",getUserFavorites);
router.post("/", addFavorite);
router.delete("/", deleteFavorite);
// router.get("/:userId", isFavorite);

export default router;
