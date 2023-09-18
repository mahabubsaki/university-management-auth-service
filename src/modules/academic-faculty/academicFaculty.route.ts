import express from 'express';
import { ENUM_USER_ROLE } from '../../enums/user.enum';
import auth from '../../middlewares/auth';
import { createAcademicFacultyController, deleteAcademicFacultyController, getAllAcademicFacultyController, getSingleAcademicFacultyController, updateAcademicFacultyController } from './academicFaculty.controller';
import { validateAcademicFaculty } from './academicFaculty.middleware';

const academicFacultyRouter = express.Router();

academicFacultyRouter.post('/create-faculty', validateAcademicFaculty, auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), createAcademicFacultyController);
academicFacultyRouter.get('/', getAllAcademicFacultyController);
academicFacultyRouter.get('/:id', getSingleAcademicFacultyController);
academicFacultyRouter.patch('/:id', updateAcademicFacultyController);
academicFacultyRouter.delete('/:id', deleteAcademicFacultyController);

export default academicFacultyRouter;
