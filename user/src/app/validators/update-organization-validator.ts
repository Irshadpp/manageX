import { body } from "express-validator";

export const updateOrgValidator = [
  body("orgName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid organization name"),
    body("description")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Please give valid description"),
      body("industry")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid industry"),
    body("website")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid website"),
    body("street")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid street"),
    body("country")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Please give valid country"),
    body("state")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid state"),
    body("city")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid city"),
    body("zipcode")
    .trim()
    .isLength({ min: 2, max: 10 })
    .withMessage("Please give valid zipcode"),
];