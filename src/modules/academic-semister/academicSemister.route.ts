import express from 'express';
import { createSemesterController, deleteSemesterController, getAllSemesterController, getSingleSemesterControler, updateSemesterController } from './academicSemister.controller';
import { validateAcademicSemister } from './academicSemister.middleware';
const semesterRouter = express.Router();

semesterRouter.post('/create-semester', validateAcademicSemister, createSemesterController);
semesterRouter.get('/', getAllSemesterController);
semesterRouter.get('/:id', getSingleSemesterControler);
semesterRouter.patch('/:id', updateSemesterController);
semesterRouter.delete('/:id', deleteSemesterController);
export default semesterRouter;