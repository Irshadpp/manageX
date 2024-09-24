import express from 'express';
import { requireAuth, validateRequest } from '@ir-managex/common';
import { createTaskValidator } from '../validators/create-task-validator';
import { createTask, fetchComments, fetchTasks, replyToComment, updateTask } from '../controllers/task.controller';
import { updateTaskValidator } from '../validators/update-task-validator';

const router = express.Router();

router.post(
    "/:projectId",
    requireAuth,
    createTaskValidator,
    validateRequest,
    createTask
)

router.get(
    "/:projectId",
    requireAuth,
    fetchTasks
)

router.patch(
    "/:taskId",
    requireAuth,
    updateTaskValidator,
    validateRequest,
    updateTask
)

router.patch(
    "/:taskId/comments/reply",
    requireAuth,
    validateRequest,
    replyToComment
);

router.get(
    "/:taskId/comments",
    fetchComments
)



export {router as taskRouter}