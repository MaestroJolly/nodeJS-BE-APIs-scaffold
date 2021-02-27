import * as winston from "winston";
import { env } from "../config";

const log_level = env === "development" ? "debug" : "warn";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: log_level,
      format: winston.format.simple(),
    }),
  ],
});

export default logger;
