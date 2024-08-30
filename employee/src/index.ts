import { app } from "./app";
import { connectDB } from "./config/db";
import { envChecker } from "./config/env-checker";
import dotenv from "dotenv";
dotenv.config();

const start = async () => {
  try {
    envChecker();
    connectDB();
  } catch (error: any) {
    console.log(error.message);
  }

  app.listen("4000", () => {
    console.log("User listening on port 4000");
  });
};

start();
