import { body } from "express-validator";

export const loginUserValidator =  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be at least 8 characters")
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/)
      .withMessage(
        "Password must include at least one uppercase letter, one number, and one symbol"
      )
    ]
