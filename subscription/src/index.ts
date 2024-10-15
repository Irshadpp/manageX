import { app } from "./app";
import { connectDB } from "./config/db";
import { envChecker } from "./config/env-checker";
import dotenv from "dotenv";
import { rabbitmqWrapper } from "./config/rabbimq-wrapper";
dotenv.config();

const start = async () => {
  try {
    envChecker();
    await rabbitmqWrapper.connect();

    connectDB();
  } catch (error: any) {
    console.log(error.message);
  }

  app.listen("9000", () => {
    console.log("subscirption listening on port 9000");
  });
};

start();
