import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import {
  env,
  generalLimitTimeInMinutes,
  generalNumberOfRequestLimit,
  redisDevUrl,
  redisProdUrl,
} from "@config/index";

// let RedStore = new RedisStore();

// if development env

let RedStore = new RedisStore({
  redisURL: redisDevUrl,
});
// production env
if (env === "production") {
  RedStore = new RedisStore({
    redisURL: redisProdUrl,
  });
}

// general limit middleware checker to limit a user to these number of requests
export const general_rate_limit_checker = rateLimit({
  store: RedStore,
  windowMs: generalLimitTimeInMinutes * 60 * 1000,
  max: generalNumberOfRequestLimit,
  message: {
    status: 429, //might remove this entirely or change it to error when i can correctly parse this to string
    message: "Too many requests, please try again later.",
    data: null,
  },
  headers: true,
});
