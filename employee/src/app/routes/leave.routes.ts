import { requireAuth, validateRequest } from '@ir-managex/common';
import express from 'express';
import { applyLeave, fetchLeaveApplicatons, fetchLeaveApplicatonsForOwner, updateLeaveStatus } from '../controllers/leave.controller';
import { applyLeaveValidator } from '../validators/apply-leave.validator';

const router = express.Router();

router.post(
    "/",
    requireAuth,
    applyLeaveValidator,
    validateRequest,
    applyLeave
)

router.patch(
    "/status/:leaveId",
    requireAuth,
    updateLeaveStatus
);

router.get(
    "/",
    requireAuth,
    fetchLeaveApplicatons
)

router.get(
    "/requests",
    requireAuth,
    fetchLeaveApplicatonsForOwner
)


export { router as leaveRouter}