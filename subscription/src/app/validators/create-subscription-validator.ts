import { body } from "express-validator";

export const createSubscriptionValidator = [
//   body("price")
//     .notEmpty()
//     .withMessage("Price ID is required")
//     .isString()
//     .withMessage("Price ID must be a valid string"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please provide a valid name (2-50 characters)"),

  body("address.line1")
    .notEmpty()
    .withMessage("Street address is required")
    .isString()
    .withMessage("Street address must be a valid string"),

  body("address.city")
    .notEmpty()
    .withMessage("City is required")
    .isString()
    .withMessage("City must be a valid string"),

  body("address.state")
    .notEmpty()
    .withMessage("State is required")
    .isString()
    .withMessage("State must be a valid string"),

  body("address.country")
    .notEmpty()
    .withMessage("Country is required")
    .isString()
    .withMessage("Country must be a valid string"),

  body("address.postal_code")
    .notEmpty()
    .withMessage("Postal code is required")
    .isPostalCode("any")
    .withMessage("Please provide a valid postal code"),
];
