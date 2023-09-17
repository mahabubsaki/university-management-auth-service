import express from 'express';
import { authLoginController, refreshTokenController } from './auth.controller';
import { validateLogin, validateRefreshToken } from './auth.middlewares';


const authRouter = express.Router();

authRouter.post('/login', validateLogin, authLoginController);
authRouter.post('/refresh-token', validateRefreshToken, refreshTokenController);

export default authRouter;