import { requireAuth, validateRequest } from '@ir-managex/common';
import express from 'express';
import { createEmployeeValidator } from '../validators/create-employee.validator';
import { createEmployee, fetchEmployeesWithOrgId, sendInvitationMail, updateEmployee } from '../controllers/employee.controller';
import { sendInvitationValidator } from '../validators/send-invitation.mail.validator';
import { updateEmployeeValidator } from '../validators/update-employee.validator';

const router = express.Router();

router.post('/',
    requireAuth,
    createEmployeeValidator,
    validateRequest,
    createEmployee
)

router.patch('/:id',
    requireAuth,
    updateEmployeeValidator,
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