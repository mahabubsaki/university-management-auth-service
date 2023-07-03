import express from 'express';
import { createSemesterController, getAllSemesterController, getSingleSemesterControler } from './academicSemister.controller';
import { validateAcademicSemister } from './academicSemister.middleware';
const semesterRouter = express.Router();

semesterRouter.post('/create-semester', validateAcademicSemister, createSemesterController);
semesterRouter.get('/', getAllSemesterController);
semesterRouter.get('/:id', getSingleSemesterControler);
export default semesterRouter;