import express from "express";
import { checkRoomExists, getTurnCredentials } from "../controllers/meet.controller";
import { requireAuth } from "@ir-managex/common";

const router = express.Router();

router.get("/room-exists/:roomId",requireAuth, checkRoomExists)

router.get("/get-turn-credentials", getTurnCredentials);

export {router as meetRouter}