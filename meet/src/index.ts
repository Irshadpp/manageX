import { app } from "./app";
// import { connectDB } from "./config/db";
import {createServer} from "http";
import twilio from 'twilio';
import { socketWrapper } from "./config/socket-wrapper";
import dotenv from "dotenv";
import { SocketEvents } from "./app/events/socket/socket-events";
import { envChecker } from "./config/env-checker";
dotenv.config();

export let connectedUsers: any[] = [];
export let rooms: any[] = [];

const start = async () => {
  try {
    const PORT = process.env.PORT || 8000
    envChecker();

    // connectDB();

    const httpServer = createServer(app);
    socketWrapper.init(httpServer);
    SocketEvents.init()

    httpServer.listen(PORT, () => {
      console.log(`Meet listening on port ${PORT}`);
    });

  } catch (error: any) {
    console.log(error.message);
  }

};

start();
