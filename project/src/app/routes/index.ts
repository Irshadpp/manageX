import express from 'express';
import { projectRouter } from './project.routes';
import { userRouter } from './user.routes';
import { taskRouter } from './task.routes';

const router = express.Router();

router.use("/project", projectRouter);

router.use("/users", userRouter);

router.use("/task", taskRouter);

export {router as appRouter}