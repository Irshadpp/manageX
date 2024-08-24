import { requireAuth, validateRequest } from "@ir-managex/common";
import express from "express";
import { createUserValidator } from "../validators/create-user.validator";
import { createUser, updateUser, verifyEmail } from "../controllers/user.controller";
import { updateUserValidator } from "../validators/update-user.validator";

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
  );

  router.patch(
    "/",
    updateUserValidator,
    requireAuth,
    updateUser
  )

  export {router as userRoutes}

