import express from 'express';
import { projectRouter } from './project.routes';
import { userRouter } from './user.routes';

const router = express.Router();

router.use("/project", projectRouter);

router.use("/users", userRouter);

export {router as appRouter}