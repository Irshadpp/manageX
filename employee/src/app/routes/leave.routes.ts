import { requireAuth, validateRequest } from '@ir-managex/common';
import express from 'express';
import { applyLeave, updateLeaveStatus } from '../controllers/leave.controller';
import { applyLeaveValidator } from '../validators/apply-leave.validator';

const router = express.Router();

router.post(
    "/apply",
    requireAuth,
    applyLeaveValidator,
    validateRequest,
    applyLeave
)

router.patch(
    "/status/:leaveId",
    requireAuth,
    updateLeaveStatus
)