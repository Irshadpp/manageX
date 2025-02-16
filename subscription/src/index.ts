import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import { connectDB } from "./config/db";
import { envChecker } from "./config/env-checker";
import { rabbitmqWrapper } from "./config/rabbimq-wrapper";

const start = async () => {
  const PORT = process.env.PORT || 9000
  try {
    envChecker();
    await rabbitmqWrapper.connect();

    connectDB();
  } catch (error: any) {
    console.log(error.message);
  }

  app.listen(PORT, () => {
    console.log(`subscirption listening on port ${PORT}`);
  });
};

start();
