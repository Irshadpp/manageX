import express from 'express';
import { requireAuth } from '@ir-managex/common';
import { fetchMembers } from '../controllers/user.controller';

const router = express.Router();

router.get(
    "/members",
    requireAuth,
    fetchMembers
);

export {router as userRouter}
