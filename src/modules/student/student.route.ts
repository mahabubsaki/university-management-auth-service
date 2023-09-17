import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { deleteStudentController, getAllStudentsController, getSingleStudentController, updateStudentController } from './student.controller';
import { updateStudentZodSchema } from './student.validator';

const studentRouter = express.Router();

studentRouter.get('/', getAllStudentsController);
studentRouter.get('/:id', getSingleStudentController);
studentRouter.delete('/:id', deleteStudentController);
studentRouter.patch('/:id', validateRequest(updateStudentZodSchema), updateStudentController);
export default studentRouter;