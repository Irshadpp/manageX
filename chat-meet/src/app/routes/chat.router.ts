import { requireAuth } from "@ir-managex/common";
import express from "express";
import { getChats } from "../controllers/chat.controller";

const router = express.Router();

router.get(
    "/",
     requireAuth,
     getChats
)

export {router as chatRouter};