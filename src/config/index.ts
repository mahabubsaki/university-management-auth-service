import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUri: process.env.DATABASE_URL,
  default_student_password: process.env.DEAFAULT_STUDENT_PASSWORD
};
