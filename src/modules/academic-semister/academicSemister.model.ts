import { model } from 'mongoose';
import { IUserStatics } from '../users/user.interface';
import { IAcademicSemester } from './academicSemister.interface';
import { AcademicSemesterSchema } from './academicSemister.schema';

export const User = model<IAcademicSemester, IUserStatics>('Academic-Semester', AcademicSemesterSchema);