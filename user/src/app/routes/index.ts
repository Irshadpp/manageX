import express from "express";
import {userRoutes} from "./user.routes";
import { orgRouter } from "./organization.routes";
import { authRouter } from "./auth.routes";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/users", userRoutes);

router.use("/organization", orgRouter);

export {router as appRouter}