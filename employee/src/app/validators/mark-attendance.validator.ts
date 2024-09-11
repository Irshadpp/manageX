import { body } from "express-validator";

export const markAttendanceValidator = [
  body("type")
    .notEmpty()
    .withMessage("Attendance type is required")
    .isIn(["checkIn", "checkOut"])
    .withMessage('Attendance type must be either "checkIn" or "checkOut"'),

  body("remarks")
    .optional()
    .trim()
    .isString()
    .withMessage("Remarks must be a valid string"),
];
