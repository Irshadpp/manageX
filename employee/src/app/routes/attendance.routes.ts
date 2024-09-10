import { requireAuth } from '@ir-managex/common';
import express from 'express';

const router = express.Router();

router.post(
    "/",
    requireAuth,
)

export {router as attendanceRouter}