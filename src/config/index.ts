import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  dbUri: process.env.DATABASE_URL,
  default_user_password: process.env.DEAFAULT_USER_PASSWORD
};
