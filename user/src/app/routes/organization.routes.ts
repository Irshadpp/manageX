import { requireAuth } from "@ir-managex/common";
import express from "express";
import { updateOrgValidator } from "../validators/update-organization-validator";
import { updateOrg } from "../controllers/Organization.controller";

const router = express.Router();

router.patch("/",
    updateOrgValidator,
    requireAuth,
    updateOrg
)

export {router as orgRouter}