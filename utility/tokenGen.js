import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
export const genAccessToken = (payLoad) => {
  return jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECERT, {
    expiresIn: "1d",
  });
};

export const genRefreshToken = (payLoad) => {
  return jwt.sign(payLoad, process.env.REFRESH_TOKEN_SECERT, {
    expiresIn: "7d",
  });
};

export const genResetPasswordToken = (payload) => {
  return jwt.sign(payload, process.env.RESET_PASSWORD_SECRET, { expiresIn: "10m" });
};
