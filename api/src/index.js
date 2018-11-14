import "./env";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { apiRouter, authRouter } from "./routes";
import "./db";

const app = express();

const { PORT = 3000, NODE_ENV = "development" } = process.env;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", apiRouter);
app.use("/auth", authRouter);

if (NODE_ENV === "development") {
  app.use(express.static("/assets"));
}

app.listen(PORT, console.log("> API Listening"));
