import { requireAuth, validateRequest } from '@ir-managex/common';
import express from 'express';
import { createEmployeeValidator } from '../validators/create-employee.validator';
import { createEmployee, sendInvitationMail, updateEmployee } from '../controllers/employee.controller';
import { sendInvitationValidator } from '../validators/send-invitation.mail.validator';

const router = express.Router();

router.post('/',
    requireAuth,
    createEmployeeValidator,
    validateRequest,
    createEmployee
)

router.patch('/',
    requireAuth,
    createEmployeeValidator,
    validateRequest,
    updateEmployee
)

router.post('/send-invitation',
    requireAuth,
    sendInvitationValidator,
    validateRequest,
    sendInvitationMail
)

export {router as employeeRouter}