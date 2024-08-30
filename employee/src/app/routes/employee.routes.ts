import { requireAuth, validateRequest } from '@ir-managex/common';
import express from 'express';
import { createEmployeeValidator } from '../validators/create-employee.validator';
import { createEmployee } from '../controllers/employee.controller';

const router = express.Router();

router.post('/',
    requireAuth,
    createEmployeeValidator,
    validateRequest,
    createEmployee
)

export {router as employeeRouter}