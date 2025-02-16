import { app } from "./app";
import { connectDB } from "./config/db";
import {createServer} from "http";
import { envChecker } from "./config/env-checker";
import dotenv from "dotenv";
import { rabbitmqWrapper } from "./config/rabbimq-wrapper";
import { ChatUserCreatedConsumer } from "./app/events/consumers/user-created-consumer";
import { ChatUserUpdatedConsumer } from "./app/events/consumers/user-updated-consumer";
import { socketWrapper } from "./config/socket-wrapper";
import { ChatEvents } from "./app/events/chat/chat.events";
dotenv.config();

const start = async () => {
  try {

    const PORT = process.env.PORT || 7000
    envChecker();
    await rabbitmqWrapper.connect();
    new ChatUserCreatedConsumer(rabbitmqWrapper.channel).consume();
    new ChatUserUpdatedConsumer(rabbitmqWrapper.channel).consume();

    connectDB();

    const httpServer = createServer(app);
    socketWrapper.init(httpServer);
    ChatEvents.init();

    httpServer.listen(PORT, () => {
      console.log("Chat-Meet listening on port 7000");
    });

  } catch (error: any) {
    console.log(error.message);
  }

};

start();
