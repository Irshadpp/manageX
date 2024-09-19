import { body } from "express-validator";
import mongoose from "mongoose";

export const createProjectValidator = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please give a valid project name"),
  
  body("description")
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage("Please provide a valid description (5-500 characters)"),
  
  body("startDate")
    .isISO8601()
    .withMessage("Please provide a valid ISO date for the start date")
    .custom((value: string) => {
      const startDate = new Date(value);
      const currentDate = new Date();
      if (startDate < currentDate) {
        throw new Error("Start date cannot be in the past");
      }
      return true;
    }),

  body("endDate")
    .isISO8601()
    .withMessage("Please provide a valid ISO date for the end date")
    .custom((value: string, { req }) => {
      const endDate = new Date(value);
      const startDate = new Date(req.body.startDate);
      if (endDate <= startDate) {
        throw new Error("End date must be after the start date");
      }
      return true;
    }),

  body("members")
    .isArray({ min: 1 })
    .withMessage("Members should be a non-empty array")
    .custom((members: string[]) => {
      for (const member of members) {
        if (!mongoose.Types.ObjectId.isValid(member)) {
          throw new Error("Invalid member ID");
        }
      }
      return true;
    }),

  body("manager")
    .trim()
    .custom((value: string) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid manager ID");
      }
      return true;
    }),
];
