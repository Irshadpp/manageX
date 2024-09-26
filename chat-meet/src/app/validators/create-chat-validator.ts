import { body } from 'express-validator';
import { ChatType } from '../model/enum';

export const createChatValidator = [
  body('participants')
    .isArray({ min: 2 })
    .withMessage('At least two participants are required')
    .custom((participants) => {
      if (participants.some((participant: string) => !participant)) {
        throw new Error('All participants must be valid user IDs');
      }
      return true;
    }),
  body('type')
    .isString()
    .isIn([ChatType.SINGLE, ChatType.GROUP])
    .withMessage('Chat type must be either "single" or "group"'),
  body('groupName')
    .optional()
    .isString()
    .withMessage('Group name must be a string')
    .isLength({ min: 1 })
    .withMessage('Group name must not be empty'),
  body('groupDescription')
    .optional()
    .isString()
    .withMessage('Group description must be a string')
    .isLength({ min: 1 })
    .withMessage('Group description must not be empty'),
];
