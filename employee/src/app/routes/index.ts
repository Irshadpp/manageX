import express from 'express';
import { employeeRouter } from './employee.routes';
import { attendanceRouter } from './attendance.routes';
import { attendancePolicyRouter } from './attendance-policy.routes';

const router = express.Router();

router.use('/employee', employeeRouter)
router.use('/attendance', attendanceRouter) 
router.use('/attendance-policy', attendancePolicyRouter) 

export {router as appRouter}