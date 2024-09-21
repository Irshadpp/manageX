import { body } from "express-validator";
import mongoose from "mongoose";
import { DurationType, Priority, ProjectStatus } from "../model/enum";

export const createTaskValidator = [
  body("title")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Please provide a valid task title (2-100 characters)"),

  body("description")
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage("Please provide a valid task description (5-500 characters)"),

  body("projectId")
    .trim()
    .custom((value: string) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid project ID");
      }
      return true;
    }),
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

  body("dueDate")
    .isISO8601()
    .withMessage("Please provide a valid ISO date for the due date")
    .custom((value: string, { req }) => {
      const dueDate = new Date(value);
      const startDate = new Date(req.body.startDate);
      if (dueDate <= startDate) {
        throw new Error("Due date must be after the start date");
      }
      return true;
    }),

  body("status")
    .trim()
    .isIn(Object.values(ProjectStatus))
    .withMessage("Invalid status value"),

  body("priority")
    .trim()
    .isIn(Object.values(Priority))
    .withMessage("Invalid priority value"),

  body("assignee")
    .trim()
    .custom((value: string) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid assignee ID");
      }
      return true;
    }),

  body("attachments")
    .optional()
    .isArray()
    .withMessage("Attachments should be an array of strings"),

  body("subTasks")
    .optional()
    .isArray()
    .withMessage("Subtasks should be an array")
    .custom((subTasks: any[]) => {
      for (const subTask of subTasks) {
        if (typeof subTask.title !== 'string' || subTask.title.trim().length === 0) {
          throw new Error("Each subtask must have a valid title");
        }
        if (!Object.values(DurationType).includes(subTask.duration?.durationType)) {
          throw new Error("Invalid duration type for subtask");
        }
      }
      return true;
    }),

  body("comments")
    .optional()
    .isArray()
    .withMessage("Comments should be an array"),
];
