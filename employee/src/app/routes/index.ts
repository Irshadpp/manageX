import express from 'express';
import { employeeRouter } from './employee.routes';
import { attendanceRouter } from './attendance.routes';
import { attendancePolicyRouter } from './attendance-policy.routes';
import { leaveRouter } from './leave.routes';

const router = express.Router();

router.use('/employee', employeeRouter)
router.use('/attendance', attendanceRouter) 
router.use('/attendance-policy', attendancePolicyRouter) 
router.use('/leave', leaveRouter)

export {router as appRouter}