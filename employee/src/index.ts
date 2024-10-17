import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import { connectDB } from "./config/db";
import { envChecker } from "./config/env-checker";
import { rabbitmqWrapper } from "./config/rabbitmqWrpper";
import { EmployeeCreatedConsumer } from "./app/events/consumers/employee-created-consumer";

const start = async () => {
  try {
    envChecker();
    await rabbitmqWrapper.connect(); 
    new EmployeeCreatedConsumer(rabbitmqWrapper.channel).consume();       
    connectDB();
  } catch (error: any) {
    console.log(error.message);
  }

  app.listen("4000", () => {
    console.log("Employee listening on port 4000");
  });
};

start();
