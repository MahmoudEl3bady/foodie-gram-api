import jwt from "jsonwebtoken";
export const isValidResetPasswordToken = (token) => {
  return  jwt.verify(token, process.env.RESET_PASSWORD_SECRET, (err, payload) => {
    if (!token) return res.sendStatus(401);
    if (err) {
        console.log(err.message);
    }
    return payload;
  });
};
