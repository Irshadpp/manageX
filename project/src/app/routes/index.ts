import express from 'express';
import { projectRouter } from './project.routes';
import { taskRouter } from './task.routes';

const router = express.Router();

router.use("/project", projectRouter);

router.use("/task", taskRouter);

export {router as appRouter}