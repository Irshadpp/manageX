import { requireAuth, validateRequest } from '@ir-managex/common';
import express from 'express';
import { markAttendanceValidator } from '../validators/mark-attendance.validator';
import { getAttendanceLogs, markAttendance } from '../controllers/attendance.controller';

const router = express.Router();

router.post(
    "/",
    requireAuth,
    markAttendanceValidator,
    validateRequest,
    markAttendance
);

router.get(
    "/",
    requireAuth,
    getAttendanceLogs
)

export {router as attendanceRouter}