import { body } from "express-validator";
import { EmpType, Gender, Role } from "../model/enum";

export const createEmployeeValidator = [
  body("fName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid first name"),
  body("lName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid last name"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please give valid email"),
  body("username")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid username"),
  body("role")
    .trim()
    .isIn(Object.values(Role))
    .withMessage("Please give valid role"),
    body("employeeType")
      .trim()
      .isIn(Object.values(EmpType))
      .withMessage("Please give valid employee type"),
  body("gender")
    .trim()
    .isIn(Object.values(Gender))
    .withMessage("Please give valid gender"),
    body("salary")
    .trim()
    .isNumeric().withMessage("Salary must be a number")
    .isFloat({gt:0})
    .withMessage("Salary must be greater than 0")
    .withMessage("Please give a valid salary"),
  body("street")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid street"),
  body("city")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid city"),
  body("country")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid country"),
  body("state")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid state"),
  body("zipcode")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give valid zipcode"),
  body("phone")
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Please give valid phone"),
  body("hiringDate")
    // .isDate()
    // .withMessage("Please provide a valid date"),
];
