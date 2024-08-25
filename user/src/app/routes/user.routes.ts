import { requireAuth, validateRequest } from "@ir-managex/common";
import express from "express";
import {updateUser} from "../controllers/user.controller";
import { updateUserValidator } from "../validators/update-user.validator";

const router = express.Router();

  router.patch(
    "/",
    updateUserValidator,
    requireAuth,
    updateUser
  )

  export {router as userRoutes}

