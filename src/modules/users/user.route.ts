import express from 'express';
import { createUserController } from './user.controller';
import { validateCreateUser } from './users.middlewares';
const userRouter = express.Router();

userRouter.post('/create-user', validateCreateUser, createUserController);
export default userRouter;