import express from 'express';
import { employeeRouter } from './employee.routes';

const router = express.Router();

router.use('/employee', employeeRouter)

export {router as appRouter}