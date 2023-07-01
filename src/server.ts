import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';
let server: Server;


process.on("uncaughtException", (error) => {
  errorLogger.error(error);
  process.exit(1);
});
async function main() {

  try {
    await mongoose.connect(config.dbUri as string);
    server = app.listen(config.port, () => {
      logger.info(`Listening to ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('failed to connect db', err);
  }
  process.on('unhandledRejection', (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }

  });
}
main();

process.on("SIGTERM", () => {
  logger.info("Sigterm recieved");
  server.close(() => {
    process.exit(1);
  });
});

//testing2