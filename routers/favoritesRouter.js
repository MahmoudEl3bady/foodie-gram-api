import express from "express";
import {
  addFavorite,
  deleteFavorite,
  getUserFavorites,
  isFavorite
} from "../controllers/favsController.js";
import authToken from "../middleware/authToken.js";

const router = express.Router({ mergeParams: true });

router.use(authToken);
// /Favorites 
router.get("/",getUserFavorites);
router.post("/:recipe_id", addFavorite);
router.delete("/:recipe_id", deleteFavorite);
router.get("/:recipe_id", isFavorite);

export default router;
