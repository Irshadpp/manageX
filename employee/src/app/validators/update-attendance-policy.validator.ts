import { body } from "express-validator";

export const updateAttendancePolicyValidator = [
    body('officeStartTime')
      .optional()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage('Office start time must be in HH:MM format'),
    
    body('lateThreshold')
      .optional()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage('Late threshold must be in HH:MM format'),
    
    body('halfDayThreshold')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Half day threshold must be a positive integer'),
  
    body('fullDayThreshold')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Full day threshold must be a positive integer'),
  
    body('leavePolicy.sickLeaves')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Sick leaves must be a non-negative integer'),
    
    body('leavePolicy.casualLeaves')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Casual leaves must be a non-negative integer'),
    
    body('leavePolicy.vecationLeaves')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Vacation leaves must be a non-negative integer'),
  ];  