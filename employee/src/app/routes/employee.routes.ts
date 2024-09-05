import { requireAuth, validateRequest } from '@ir-managex/common';
import express from 'express';
import { createEmployeeValidator } from '../validators/create-employee.validator';
import { createEmployee, fetchEmployeesWithOrgId, sendInvitationMail, updateEmployee } from '../controllers/employee.controller';
import { sendInvitationValidator } from '../validators/send-invitation.mail.validator';

const router = express.Router();

// const isAuth = new requireAuth(Emplo)

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

router.get('/',
    requireAuth,
    fetchEmployeesWithOrgId
)

export {router as employeeRouter}