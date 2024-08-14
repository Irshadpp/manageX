import express from "express";
import { json } from "body-parser";

const app = express();

app.use(json());

export { app };
