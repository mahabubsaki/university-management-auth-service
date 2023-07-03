import express from 'express';
import { createAcademicFacultyController, deleteAcademicFacultyController, getAllAcademicFacultyController, getSingleAcademicFacultyController, updateAcademicFacultyController } from './academicFaculty.controller';
import { validateAcademicFaculty } from './academicFaculty.middleware';

const academicFacultyRouter = express.Router();

academicFacultyRouter.post('/create-faculty', validateAcademicFaculty, createAcademicFacultyController);
academicFacultyRouter.get('/', getAllAcademicFacultyController);
academicFacultyRouter.get('/:id', getSingleAcademicFacultyController);
academicFacultyRouter.patch('/:id', updateAcademicFacultyController);
academicFacultyRouter.delete('/:id', deleteAcademicFacultyController);

export default academicFacultyRouter;
