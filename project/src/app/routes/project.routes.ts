import express from 'express';
import { createProject } from '../controllers/project.controller';

const router = express.Router();

router.post(
    "/",
    createProject
)

export {router as projectRouter}