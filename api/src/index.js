import "./env"
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { apiRouter } from "./routes";
import  db  from "./db";

const app = express();

const { PORT } = process.env;

db()
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", apiRouter);

app.listen(PORT, console.log(`> Listening ${PORT}`));
