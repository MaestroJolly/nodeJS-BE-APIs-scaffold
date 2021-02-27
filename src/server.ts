import { sequelize, mongoConfig } from "./models";
// application
import { app } from "./app";
import mongoose from "mongoose";

// config settings
import { env, port, syncStatus } from "./config";

// import logger service
import logger from "./utils/logger";

// sequelize db connection
sequelize
  .authenticate()
  .then(async () => {
    logger.info("Primary DB Connection Successfully Established.");
    try {
      await sequelize.sync({ force: !syncStatus });
    } catch (error) {
      logger.error(error);
    }

    // mongo db connection
    try {
      const mongoConnectionSettings = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      };
      await mongoose.connect(
        mongoConfig[env].mongo_uri,
        mongoConnectionSettings
      );
      logger.info("Secondary DB Connection Successfully Established");
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }

    // application startup
    app.listen(port, async () => {
      logger.info(`app is running on ${port}`);
    });
  })
  .catch((err: any) => {
    logger.error(err);
  });
