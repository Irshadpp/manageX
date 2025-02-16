import { app } from "./app";
import { connectDB } from "./config/db";
import { envChecker } from "./config/env-checker";
import dotenv from "dotenv";
import { rabbitmqWrapper } from "./config/rabbimq-wrapper";
import { ProjectUserCreatedConsumer } from "./app/events/consumers/user-created-consumer";
import { ProjectUserUpdatedConsumer } from "./app/events/consumers/user-updated-consumer";
dotenv.config();

const start = async () => {
  const port = process.env.PORT || 5000;
  console.log(`Starting server on port: ${port}`);
  try {
    envChecker();
    await rabbitmqWrapper.connect();
    new ProjectUserCreatedConsumer(rabbitmqWrapper.channel).consume();
    new ProjectUserUpdatedConsumer(rabbitmqWrapper.channel).consume();

    await connectDB();
  } catch (error: any) {
    console.log(error.message);
  }
  app.listen(port, () => {
    console.log(`Project listening on port ${port}`);
  });
};

start();
