import express from 'express';
import { createProject, fetchMembers, fetchProjectCount, getProjects, updateProject } from '../controllers/project.controller';
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

router.get(
    "/count",
    requireAuth,
    fetchProjectCount    
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

router.get(
    "/members",
    requireAuth,
    fetchMembers
);

export {router as projectRouter}