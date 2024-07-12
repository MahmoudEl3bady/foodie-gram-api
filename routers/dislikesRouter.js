import express from "express";
import {
  addDislike,deleteDislike,dislikeCounts
} from "../controllers/dislikesController.js";

const router = express.Router({ mergeParams: true });

router.post("/", addDislike);
router.delete("/", deleteDislike);
router.get("/count", dislikeCounts);
// router.get("/:userId", isDisliked);

export default router;
