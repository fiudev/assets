import "./env";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import create from "./create";

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Uploader"));
app.use("/create", create);

app.listen(PORT, () => console.log("> Uploader listening"));
