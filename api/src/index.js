import "./env";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { apiRouter, authRouter } from "./routes";
import db from "./db";

const app = express();

const { PORT } = process.env;

db();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.use("/auth", authRouter);

app.listen(PORT, console.log("> API Listening"));
