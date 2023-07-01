import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

async function main() {
  try {
    await mongoose.connect(config.dbUri as string);
    app.listen(config.port, () => {
      logger.info(`Listening to ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('failed to connect db', err);
  }
}
main();
