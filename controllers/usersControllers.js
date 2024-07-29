import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import db from "../db/db.js";
import { genAccessToken, genRefreshToken } from "../utility/tokenGen.js";
import {
  revokingRefreshToken,
  isValidRefreshToken,
  saveRefreshToken,
} from "../utility/refreshToken.js";
import { validationResult } from "express-validator";
import { customError } from "../utility/customError.js";

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((a) => a.msg) });
  }
  const { fName, lName, pass, email, usrName } = req.body;
  const id = uuidv4();
  const existingUser = db.raw('SELECT * FROM users WHERE username=? OR email=?',[usrName,email]);
  try {
    if(existingUser){
      throw new customError("Username or Email already exist!",401);
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
  const { usrName,email,pass } = req.body;
  try {
    console.log(usrName,email)
    let user;
    if(usrName){
      user = await db("users").where({ username: usrName }).first();
    }else{
      user = await db("users").where({ email: email }).first();
    }
    if (!user) {
      throw new customError("Incorrect username or password", 404);
    }

    if (await bcrypt.compare(pass, user.password)) {
      let payLoad;
      if(usrName){
        payLoad = { usrName: usrName };
      }else{
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
  try {
    const user = await db("users")
      .where({ username: req.user.usrName })
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
