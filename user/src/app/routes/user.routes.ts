import { requireAuth, validateRequest } from "@ir-managex/common";
import express from "express";
import {blockUser, fetchUsers, fetchUserStatus, updateUser} from "../controllers/user.controller";
import { updateUserValidator } from "../validators/update-user.validator";

const router = express.Router();

  router.patch(
    "/",
    updateUserValidator,
    requireAuth,
    updateUser
  )

  router.get(
    "/",
    requireAuth,
    fetchUsers
  )

  router.get(
    "/status/:userId",
    requireAuth,
    fetchUserStatus
  )

  router.patch(
    "/block/:userId",
    // requireAuth,
    blockUser
  )

  export {router as userRoutes}

