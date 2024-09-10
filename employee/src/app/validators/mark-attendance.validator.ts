import { body } from "express-validator";

export const markAttendanceValidator = [
  body('employeeId')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isMongoId()
    .withMessage('Invalid Employee ID'),

  body('organizationId')
    .notEmpty()
    .withMessage('Organization ID is required')
    .isMongoId()
    .withMessage('Invalid Organization ID'),

  body('checkInTime')
    .notEmpty()
    .withMessage('Check-in time is required')
    .isISO8601()
    .withMessage('Check-in time must be a valid ISO 8601 date'),

  body('checkOutTime')
    .optional()
    .isISO8601()
    .withMessage('Check-out time must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.checkInTime)) {
        throw new Error('Check-out time must be after check-in time');
      }
      return true;
    }),
];
