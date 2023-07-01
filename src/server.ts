import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';
async function main() {
  let server: Server;
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
