import { Sequelize } from "sequelize-typescript";
import { config } from "../config/config";
import { env } from "../config";
import path from "path";

const dbConfig = config[env];

const ext = path.extname(__filename);

// sequelize database connection configuration
export const sequelize = new Sequelize({
  ...dbConfig,
  models: [`${__dirname}/sequelize/**/*.model${ext}`],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
    );
  },
});

// mongo connection configuration
type Config = {
  [key: string]: any;
};

export const mongoConfig: Config = {
  development: {
    mongo_uri: process.env.DEV_MONGODB_URI,
  },
  staging: {
    mongo_uri: process.env.STAGING_MONGODB_URI,
  },
  production: {
    mongo_uri: process.env.PROD_MONGODB_URI,
  },
};
