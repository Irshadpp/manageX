import { app } from "./app";
import { connectDB } from "./config/db";
import { envChecker } from "./config/env-checker";
import dotenv from "dotenv";
import { rabbitmqWrapper } from "./config/rabbimq-wrapper";
// import { UserCreatedConsumer } from "./app/events/consumers/user-created-consumer";
// import { UserUpdatedConsumer } from "./app/events/consumers/user-updated-consumer";
dotenv.config();

const start = async () => {
  try {
    envChecker();
    await rabbitmqWrapper.connect();
    // new UserCreatedConsumer(rabbitmqWrapper.channel).consume();
    // new UserUpdatedConsumer(rabbitmqWrapper.channel).consume();

    connectDB();
  } catch (error: any) {
    console.log(error.message);
  }

  app.listen("6000", () => {
    console.log("Chat-Meet listening on port 6000");
  });
};

start();
