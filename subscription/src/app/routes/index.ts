import express from "express";
import { subscriptionRouter } from "./subscription.routes";

const router = express.Router();

router.use("/subscription", subscriptionRouter);

export {router as appRouter}