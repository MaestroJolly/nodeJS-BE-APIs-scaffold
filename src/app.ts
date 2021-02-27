// node packages
import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import * as requestIp from "request-ip";

// user route
import v1_routes from "./routes/v1";

// configs
import { env, SETTIMEOUT } from "./config";

export const app = express();

// cross-origin configuration
const corsOptions = {
  methods: "PUT, POST, GET, DELETE, OPTIONS",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization",
  optionsSuccessStatus: 200, // some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// middleware to get users ip
app.use((req: Request, res: Response, next: NextFunction) => {
  req.body.req_ip = requestIp.getClientIp(req);
  next();
});

// middleware to handle timeout
app.use((req: Request, res: Response, next: NextFunction) => {
  setTimeout(() => {
    if (!res.headersSent) {
      res.status(503).json({
        status: "error",
        message: "Service timeout",
      });
    }
  }, SETTIMEOUT * 1);
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.json({
    app: "nodeJS BE scaffold apis",
    version: "1.0",
  });
});

// v1 base route
app.use("/v1", v1_routes);
