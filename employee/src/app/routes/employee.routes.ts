import { requireAuth, validateRequest } from '@ir-managex/common';
import express from 'express';
import { createEmployeeValidator } from '../validators/create-employee.validator';
import { checkSubscriptionLimit, createEmployee, fetchEmployeesWithOrgId, fetchExEmployees, sendInvitationMail, terminateEmployee, updateEmployee } from '../controllers/employee.controller';
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

router.get('/subscription-limit',
    requireAuth,
    checkSubscriptionLimit
)

router.patch('/terminate/:employeeId',
    requireAuth,
    terminateEmployee
)

router.get('/ex-employees',
    requireAuth,
    fetchExEmployees
)
export {router as employeeRouter}