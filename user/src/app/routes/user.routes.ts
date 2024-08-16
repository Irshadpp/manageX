import { validateRequest } from "@ir-managex/common";
import express from "express";
import { createUserValidator } from "../validators/create-user.validator";
import { createUser } from "../controllers/user.controller";

const router = express.Router();

  router.post(
    "/signup",
    createUserValidator,
    validateRequest,
    createUser
  );
  export {router as userRoutes}

