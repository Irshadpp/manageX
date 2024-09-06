import { body } from "express-validator";
import { EmpType, Gender, Role } from "../model/enum";

export const updateEmployeeValidator = [
  body("fName")
  .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid first name"),
  body("lName")
  .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid last name"),
  body("email").trim().isEmail().withMessage("Please give valid email"),
  body("username")
  .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid username"),
  body("role")
  .optional()
    .trim()
    .isIn(Object.values(Role))
    .withMessage("Please give valid role"),
  body("employeeType")
    .trim()
    .isIn(Object.values(EmpType))
    .withMessage("Please give valid employee type"),
  body("gender")
  .optional()
    .trim()
    .isIn(Object.values(Gender))
    .withMessage("Please give valid gender"),
  body("salary")
  .optional()
    .trim()
    .isNumeric()
    .withMessage("Salary must be a number")
    .isFloat({ gt: 0 })
    .withMessage("Salary must be greater than 0")
    .withMessage("Please give a valid salary"),
  body("street")
  .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid street"),
  body("city")
  .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid city"),
  body("country")
  .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid country"),
  body("state")
  .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid state"),
  body("zipcode")
  .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid zipcode"),
  body("phone")
  .optional()
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Please give valid phone"),
    body("hiringDate")
    .isISO8601()
    .withMessage("Please provide a valid ISO date")
    .custom((value: Date) => {
      const hiringDate = new Date(value);
      const currentDate = new Date();
      
      if (hiringDate > currentDate) {
        throw new Error("Hiring date cannot be in the future");
      }
      
      return true;
    }),
  body("password")
  .optional()
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/)
    .withMessage(
      "Password must include at least one uppercase letter, one number, and one symbol"
    ),
  body("confirmPassword")
  .optional()
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
