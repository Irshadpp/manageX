import { requireAuth, validateRequest } from "@ir-managex/common";
import express from "express";
import { createChat, getChats } from "../controllers/chat.controller";
import { createChatValidator } from "../validators/create-chat-validator";

const router = express.Router();

router.get(
    "/",
     requireAuth,
     getChats
)

router.post(
    "/",
    requireAuth,
    createChatValidator,
    validateRequest,
    createChat
)

export {router as chatRouter};