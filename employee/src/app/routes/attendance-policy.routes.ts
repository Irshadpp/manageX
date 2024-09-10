import { requireAuth, validateRequest } from '@ir-managex/common';
import express from 'express';
import { fetchAttendancePolicy, updateAttendancePolicy } from '../controllers/attendance-policy.controller';
import { updateAttendancePolicyValidator } from '../validators/update-attendance-policy.validator';

const router = express.Router();

router.get(
    "/:organizationId",
    requireAuth,
    fetchAttendancePolicy
)
router.patch(
    "/:organizationId",
    requireAuth,
    updateAttendancePolicyValidator,
    validateRequest,
    updateAttendancePolicy
)

export {router as attendancePolicyRouter}