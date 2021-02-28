import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 5000;
export const syncStatus = process.env.SYNCSTATUS || false;
export const env = process.env.NODE_ENV || "development";
export const SETTIMEOUT = Number(process.env.SETTIMEOUT) || 25000;
export const generalLimitTimeInMinutes = Number(
  process.env.GENERALLIMITTIMEINMINUTES
) || 1 ;
export const generalNumberOfRequestLimit = Number(
  process.env.GENERALNUMBEROFREQUESTLIMIT
) || 10 ;
export const redisDevUrl = process.env.REDISDEVURL;
export const redisProdUrl = process.env.REDISPRODURL;

type Config = {
  [key: string]: any;
};

export const app_config: Config = {
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_expiry_time: Number(process.env.JWT_EXPIRY_TIME) || 60,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
};
