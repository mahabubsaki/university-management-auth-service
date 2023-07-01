import express from 'express';
import { createUserController } from './user.controller';
import { validateCreateUser } from './users.middlewares';
const router = express.Router();

router.post('/create-user', validateCreateUser, createUserController);
export default router;