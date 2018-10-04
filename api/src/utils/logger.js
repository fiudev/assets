import { resolve } from "path";
import winston from "winston";
import "winston-daily-rotate-file";

const transports = [
  new winston.transports.File({
    level: "info",
    filename: resolve("logs/upload.log"),
    handleExceptions: true,
    json: false,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
  }),
  new winston.transports.DailyRotateFile({
    name: "file",
    datePattern: "MM-DD-YYYY",
    filename: resolve("logs/upload.log")
  })
];

const logger = winston.createLogger({ transports, exitOnError: false });

export default logger;
