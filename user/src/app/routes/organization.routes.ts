import { requireAuth } from "@ir-managex/common";
import express from "express";
import { updateOrgValidator } from "../validators/update-organization-validator";
import { fetchOrgs, updateOrg } from "../controllers/Organization.controller";
import { isBlock } from "../middlewares/isBlocked";

const router = express.Router();

router.patch("/",
    updateOrgValidator,
    requireAuth,
    isBlock,
    updateOrg
)

router.get("/",
    fetchOrgs
)

export {router as orgRouter}