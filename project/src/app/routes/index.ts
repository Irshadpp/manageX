import express from 'express';
import { projectRouter } from './project.routes';

const router = express.Router();

router.use("/project", projectRouter);

export {router as appRouter}