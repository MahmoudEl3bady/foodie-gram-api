import express, { Router } from "express";
import {
  signup,
  signIn,
  getUser,
  token,
  signOut,
  forgetPassword,
  resetPassword,
  getResetPassword
} from "../controllers/usersControllers.js";
import authToken from "../middleware/authToken.js";
import passport from "../utility/passport.js";
import { validateSignIn, validateSignup } from "../utility/validateSignup.js";

const router = express.Router();
router.get("/", authToken, getUser);
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

// Reset user's password
router.post("/forgetPassword",forgetPassword);
router.get("/resetPassword/:id/:token",getResetPassword);
router.patch("/resetPassword/:id/:token",resetPassword);



export default router;
