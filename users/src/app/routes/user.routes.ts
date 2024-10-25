import { requireAuth, validateRequest } from "@ir-managex/common";
import express from "express";
import {blockUser, fetchUsers, updateUser} from "../controllers/user.controller";
import { updateUserValidator } from "../validators/update-user.validator";

const router = express.Router();

  router.patch(
    "/",
    requireAuth,
    updateUserValidator,
    validateRequest,
    updateUser
  )

  router.get(
    "/",
    requireAuth,
    fetchUsers
  )

  router.patch(
    "/block/:id",
    requireAuth,
    blockUser
  )

  export {router as userRoutes}

