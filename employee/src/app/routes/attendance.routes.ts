import { requireAuth, validateRequest } from '@ir-managex/common';
import express from 'express';
import { markAttendanceValidator } from '../validators/mark-attendance.validator';

const router = express.Router();

router.post(
    "/",
    requireAuth,
    markAttendanceValidator,
    validateRequest
);

export {router as attendanceRouter}