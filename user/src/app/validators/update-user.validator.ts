import { body } from "express-validator";

export const updateUserValidator = [
  body("fName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid first name"),
  body("lName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid last name"),
  body("phone")
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Please give valid phone"),
  body("dob")
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Please give valid phone"),
  body("dob")
    .isDate()
    .withMessage("Please provide a valid date")
    .isBefore(new Date().toISOString())
    .withMessage("Date of birth must be in the past"),
];
