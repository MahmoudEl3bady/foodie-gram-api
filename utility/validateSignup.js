import { body } from "express-validator";
export const validateSignup = [
  body("fName").trim().notEmpty().withMessage("First name is required"),
  body("lName").trim().notEmpty().withMessage("Last name is required"),
  body("pass")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&#]/)
    .withMessage("Password must contain at least one special character"),
  body("email").normalizeEmail().isEmail().withMessage("Invalid email address"),
  body("usrName").trim().notEmpty().withMessage("Username is required"),
];

export const validateSignIn = [
  body("usrName").trim(),
  body("email").normalizeEmail(),
  body("pass")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&#]/)
    .withMessage("Password must contain at least one special character"),
];
