import { body } from "express-validator";

export const sendInvitationValidator = [
  body("id")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Employee id required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email not given or invalid email"),
];