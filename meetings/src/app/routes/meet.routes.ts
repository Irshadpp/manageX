import express from "express";
import { checkRoomExists, getTurnCredentials } from "../controllers/meet.controller";

const router = express.Router();

router.get("/room-exists/:roomId",checkRoomExists)

router.get("/get-turn-credentials", getTurnCredentials);

export {router as meetRouter}