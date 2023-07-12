import express from 'express';
import { createStudentController } from './user.controller';
import { validateCreateUser } from './users.middlewares';
const userRouter = express.Router();

userRouter.post('/create-student', validateCreateUser, createStudentController);
export default userRouter;