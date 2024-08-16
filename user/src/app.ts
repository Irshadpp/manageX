import express from "express";
import { json } from "body-parser";
import { appRouter } from "./app/routes";
import {errorHandler, NotFoundError} from "@ir-managex/common"

const app = express();

app.use(json());

app.use("/api/v1", appRouter);


app.all("*",()=>{
    throw new NotFoundError();
})

app.use(errorHandler);

export { app };
