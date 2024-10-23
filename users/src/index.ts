import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import { connectDB } from "./config/db";
import { envChecker } from "./config/env-checker";
import { rabbitmqWrapper } from "./config/rabbitmq-wrapper";
import { UserCreatedConsumer } from "./app/events/consumers/user-created-consumer";
import { UserUpdatedConsumer } from "./app/events/consumers/user-updated-consumer";

const start = async () => {
  try {
    envChecker();
    await rabbitmqWrapper.connect();
    new UserCreatedConsumer(rabbitmqWrapper.channel).consume();
    new UserUpdatedConsumer(rabbitmqWrapper.channel).consume();

    await connectDB();
  } catch (error: any) {
    console.log(error.message);
  }

  app.listen("3000", () => {
    console.log("User listening on port 3000");
  });
};

start();
