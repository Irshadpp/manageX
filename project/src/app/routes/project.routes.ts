import express from 'express';
import { createProject, getProjects, updateProject } from '../controllers/project.controller';
import { requireAuth, validateRequest } from '@ir-managex/common';
import { createProjectValidator } from '../validators/create-project-validator';
import { updateProjectValidator } from '../validators/update-project-validator';

const router = express.Router();

router.post(
    "/",
    requireAuth,
    createProjectValidator,
    validateRequest,
    createProject
)

router.patch(
    "/:id",
    requireAuth,
    updateProjectValidator,
    validateRequest,
    updateProject
)

router.get(
    "/",
    requireAuth,
    getProjects
)

export {router as projectRouter}