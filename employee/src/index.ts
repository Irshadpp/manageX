import { app } from "./app";
import { connectDB } from "./config/db";
import { envChecker } from "./config/env-checker";
import dotenv from "dotenv";
import { rabbitmqWrapper } from "./config/rabbitmqWrpper";
import { EmployeeCreatedConsumer } from "./app/events/consumers/employee-created-consumer";
dotenv.config();

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
