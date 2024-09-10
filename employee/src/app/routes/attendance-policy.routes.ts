import { requireAuth } from '@ir-managex/common';
import express from 'express';

const router = express.Router();

router.get(
    "/:organizationId",
    requireAuth,
)
router.patch(
    "/:organizationId",
    requireAuth,
)

export {router as attendancePolicyRouter}