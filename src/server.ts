import { sequelize, mongoConfig } from "./models";
// application
import { app } from "./app";
import mongoose from "mongoose";

// config settings
import { env, port, syncStatus } from "@config/index";

// import logger service
import logger from "./utils/logger";

// sequelize db connection
(async () => {
  try {
    //Primary DB connection (Postgres/MySQL)
    await sequelize.authenticate();
    await sequelize.sync({ force: !syncStatus });
    logger.info("Primary DB Connection Successfully Established.");
    //Secondary DB connection (MongoDB)
    const mongoConnectionSettings = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    await mongoose.connect(mongoConfig[env].mongo_uri, mongoConnectionSettings);
    logger.info("Secondary DB Connection Successfully Established");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
  // application startup
  app.listen(port, async () => {
    logger.info(`app is running on ${port}`);
  });
})();
