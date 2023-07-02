import express from 'express';
import { createSemesterController } from './academicSemister.controller';
import { validateAcademicSemister } from './academicSemister.middleware';
const semesterRouter = express.Router();

semesterRouter.post('/create-semester', validateAcademicSemister, createSemesterController);
export default semesterRouter;