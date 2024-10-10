import express from "express";
import { meetRouter } from "./meet.routes";

const router = express.Router();

router.use("/meet", meetRouter);

export {router as appRouter}