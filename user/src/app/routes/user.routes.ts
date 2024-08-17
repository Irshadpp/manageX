import { validateRequest } from "@ir-managex/common";
import express from "express";
import { createUserValidator } from "../validators/create-user.validator";
import { createUser, verifyEmail } from "../controllers/user.controller";

const router = express.Router();

  router.post(
    "/signup",
    createUserValidator,
    validateRequest,
    createUser
  );

  router.get(
    "/verify-email",
    verifyEmail
  )
  export {router as userRoutes}

