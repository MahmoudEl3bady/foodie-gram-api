import express from "express";
import {
  addFavorite,
  deleteFavorite,
  getUserFavorites
} from "../controllers/favsController.js";
import authToken from "../middleware/authToken.js";

const router = express.Router({ mergeParams: true });

router.use(authToken);

router.get("/",getUserFavorites);
router.post("/", addFavorite);
router.delete("/", deleteFavorite);
// router.get("/:userId", isFavorite);

export default router;
