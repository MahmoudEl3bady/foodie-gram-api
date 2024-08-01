import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import db from "../db/db.js";
import {
  genAccessToken,
  genRefreshToken,
  genResetPasswordToken,
} from "../utility/tokenGen.js";
import {
  revokingRefreshToken,
  isValidRefreshToken,
  saveRefreshToken,
} from "../utility/refreshToken.js";
import { isValidResetPasswordToken } from "../utility/resetPasswordToken.js";
import { validationResult } from "express-validator";
import { customError } from "../utility/customError.js";
import { sendEmail } from "../utility/sendEmail.js";

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((a) => a.msg) });
  }
  const { fName, lName, pass, email, usrName } = req.body;
  const id = uuidv4();
  const existingUser = await db("users")
    .where({ username: usrName, email: email })
    .first();
  try {
    if (existingUser) {
      throw new customError("Username or Email already exist!", 401);
    }
    await db("users").insert({
      first_name: fName,
      last_name: lName,
      password: await bcrypt.hash(pass, 10),
      email: email,
      username: usrName,
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(401).json({ msg: err.message });
  }
};

export const signIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((a) => a.msg) });
  }
  const { usrName, email, pass } = req.body;
  try {
    console.log(usrName, email);
    let user;
    if (usrName) {
      user = await db("users").where({ username: usrName }).first();
    } else {
      user = await db("users").where({ email: email }).first();
    }
    if (!user) {
      throw new customError("Incorrect username or password", 404);
    }

    if (await bcrypt.compare(pass, user.password)) {
      let payLoad;
      if (usrName) {
        payLoad = { usrName: usrName };
      } else {
        payLoad = { email: email };
      }
      const accessToken = genAccessToken(payLoad);
      const refreshToken = genRefreshToken(payLoad);
      saveRefreshToken(refreshToken, user.id);
      return res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      throw new customError("Incorrect username or password", 404);
    }
  } catch (err) {
    next(err);
  }
};

export const signOut = async (req, res) => {
  const token = req.body.token;
  try {
    if (!token) return res.sendStatus(401);
    const dbToken = await isValidRefreshToken(token);
    if (!dbToken || dbToken.revoked) return res.sendStatus(403);
    revokingRefreshToken(token);
    return res.status(200).json({ msg: "Successfully signed out" });
  } catch (err) {
    return res.json({ msg: err.message });
  }
};
export const token = async (req, res) => {
  const token = req.body.token;
  if (!token) return res.sendStatus(401);
  const dbToken = await isValidRefreshToken(token);
  console.log(dbToken);
  if (!dbToken || dbToken.revoked) return res.sendStatus(403);
  jwt.verify(token, process.env.REFRESH_TOKEN_SECERT, (err, payLoad) => {
    if (err) return res.sendStatus(403);
    const accessToken = genAccessToken({ usrName: payLoad.usrName });
    const refreshToken = genRefreshToken({ usrName: payLoad.usrName });
    revokingRefreshToken(token);
    console.log(dbToken);
    saveRefreshToken(refreshToken, dbToken.user_id);
    return res.json({ accessToken, refreshToken });
  });
};

export const getUser = async (req, res) => {
  const username = req.payLoad.usrName;
  try {
    const user = await db("users")
      .where({ username: username })
      .first();
    res.json(user);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

export const getCurrentUserByUsername = async (username) => {
  const currentUser = await db.raw("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  console.log("currUser", currentUser);
  return currentUser[0];
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await db("users").where({ email: email }).first();
  console.log(user);
  try {
    if (!user) {
      throw new customError("User not found!", 404);
    }
    const payLoad = { email: email };
    const token = genResetPasswordToken(payLoad);
    const URL = process.env.URL || "http://localhost:8000/";
    const restPasswordLink = `${URL}users/resetPassword/${user.id}/${token}`;

    const emailBody = `<h2 style="text-align: center">Hey ${user.first_name} ${user.last_name}</h2>,
<div style="text-align: center; font-size: 19px;">
We received a request to change your password on Foodie Gram.

Click <a href="${restPasswordLink}">Rest Password</a> to change your password. This link is valid for half an hour.

If you didn’t request a password change, you can ignore this message and continue to use your current password.
</div>
    `;
    console.log(emailBody);
    console.log(user.email);
    await sendEmail(user.email, "Reset Password",emailBody);
    res.send({
      msg: "Check your email for reset password link"
    });
  } catch (err) {
    next(err);
  }
};

export const getResetPassword = async(req,res,next)=>{
    const {id,token}=req.params;
    try{
    const resetPasswordToken = isValidResetPasswordToken(token);
    if(!resetPasswordToken){
        throw new customError("Invalid reset password token", 400);
    }
    const user = await db("users").where({id:id}).first();
    if(!user){
        throw new customError("User not found!", 404);
    }
     
    // If using a single-page application, redirect to the frontend reset password page
    // res.redirect(`${process.env.FRONTEND_URL}/reset-password?id=${id}&token=${token}` );
  } catch (err) {
    next(err);
  }}

export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;
  try {
    const resetPasswordToken = isValidResetPasswordToken(token);
    const user = await db("users").where({ id: id }).first();
    if (!user) {
      throw new customError("User not found!", 404);
    }
    if (password !== confirmPassword) {
      throw new customError("Password does not match", 400);
    }
    if(!resetPasswordToken){
        throw new customError("Invalid reset password token", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db("users").where({ id: id }).update({ password: hashedPassword });
    return res.status(200).json({ msg: "Password reset successfully" });
  } catch (err) {
    next(err);
  }
};

