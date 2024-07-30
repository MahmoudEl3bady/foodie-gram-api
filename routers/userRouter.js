import express, { Router } from "express";
import {
  signup,
  signIn,
  getUser,
  token,
  signOut,
  forgetPassword,
  resetPassword
} from "../controllers/usersControllers.js";
import authToken from "../middleware/authToken.js";
import passport from "../utility/passport.js";
import { validateSignIn, validateSignup } from "../utility/validateSignup.js";

const router = express.Router();
router.post("/signup", validateSignup, signup);
router.post("/signin", validateSignIn, signIn);
router.post("/signout", signOut);
router.post("/token", token);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    return res.status(200).json(req.user);
  }
);

router.post("/forgetPassword",forgetPassword);
router.post("/resetPassword/:id/:token",resetPassword);
router.get("/", authToken, getUser);
export default router;
