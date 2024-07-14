import express from "express";
import {
  addDislike,deleteDislike,dislikeCounts
} from "../controllers/dislikesController.js";
import authToken from "../middleware/authToken.js";

const router = express.Router({ mergeParams: true });

router.use(authToken);

router.post("/", addDislike);
router.delete("/", deleteDislike);
router.get("/count", dislikeCounts);
// router.get("/:userId", isDisliked);

export default router;
