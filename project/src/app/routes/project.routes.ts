import express from 'express';
import { createProject, updateProject } from '../controllers/project.controller';
import { requireAuth } from '@ir-managex/common';

const router = express.Router();

router.post(
    "/",
    requireAuth,
    createProject
)

router.patch(
    "/:id",
    requireAuth,
    updateProject
)

export {router as projectRouter}