import express from 'express';
import { authLoginController } from './auth.controller';
import { validateLogin } from './auth.middlewares';


const authRouter = express.Router();

authRouter.post('/login', validateLogin, authLoginController);

export default authRouter;