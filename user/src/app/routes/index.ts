import express from "express";
import {userRoutes} from "./user.routes";
import { orgRouter } from "./organization.routes";

const router = express.Router();

router.use("/users", userRoutes);

router.use("/organization", orgRouter);


export {router as appRouter}