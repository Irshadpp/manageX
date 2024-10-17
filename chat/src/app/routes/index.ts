import express from "express";
import { chatRouter } from "./chat.router";

const router = express.Router();

router.use("/chat",chatRouter);

export {router as appRouter}