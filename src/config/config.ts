import dotenv from "dotenv";

dotenv.config();

type Config = {
  [key: string]: any;
};

export const config: Config = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOSTNAME,
    port: process.env.DEV_DB_PORT,
    dialect: process.env.DB_DIALECT,
    repositoryMode: true,
    // 'operatorsAliases': false
  },
  staging: {
    username: process.env.STAGING_DB_USERNAME,
    password: process.env.STAGING_DB_PASSWORD,
    database: process.env.STAGING_DB_NAME,
    host: process.env.STAGING_DB_HOSTNAME,
    port: process.env.STAGING_DB_PORT,
    dialect: process.env.DB_DIALECT,
    repositoryMode: true,
    // 'operatorsAliases': false
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOSTNAME,
    port: process.env.TEST_DB_PORT,
    dialect: process.env.DB_DIALECT,
    repositoryMode: true,
    // 'operatorsAliases': false
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: process.env.DB_DIALECT,
    repositoryMode: true,
    // 'operatorsAliases': false
  },
};
