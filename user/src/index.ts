import { app } from "./app";
import { connectDB } from "./config/db";
import { envChecker } from "./config/env-checker";
import dotenv from "dotenv";
import { rabbitmqWrapper } from "./config/rabbimq-wrapper";
dotenv.config();

const start = async () => {
  try {
    envChecker();
    connectDB();
    await rabbitmqWrapper.connect();
  } catch (error: any) {
    console.log(error.message);
  }

  app.listen("3000", () => {
    console.log("User listening on port 3000");
  });
};

start();
