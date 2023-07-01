import express from 'express';
import { createUserController } from './user.controller';
const router = express.Router();

router.post('/create-user', createUserController);
export default router;