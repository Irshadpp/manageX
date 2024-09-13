import { body } from 'express-validator';

export const applyLeaveValidator = [
  body('leaveType')
    .notEmpty()
    .withMessage('Leave type is required')
    .isIn(['sick', 'casual', 'vacation'])
    .withMessage('Invalid leave type'),

  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format for start date'),

  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format for end date'),

  body('reason')
    .optional()
    .isString()
    .withMessage('Reason must be a string'),
];
