import express from 'express';
import { createAcademicDepartmentController, deleteAcademicDepartmentController, getAllAcademicDepartmentsController, getSingleAcademicDepartmentController, updateAcademicDepartmentController } from './academicDepartment.controller';
import { validateAcademicDepartment } from './academicDepartment.middleware';

const academicDepartmentRouter = express.Router();

academicDepartmentRouter.post('/create-department', validateAcademicDepartment, createAcademicDepartmentController);
academicDepartmentRouter.get('/', getAllAcademicDepartmentsController);
academicDepartmentRouter.get('/:id', getSingleAcademicDepartmentController);
academicDepartmentRouter.patch('/:id', updateAcademicDepartmentController);
academicDepartmentRouter.delete('/:id', deleteAcademicDepartmentController);

export default academicDepartmentRouter;
