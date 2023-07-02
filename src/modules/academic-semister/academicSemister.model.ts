import { model } from 'mongoose';
import { IUserStatics } from '../users/user.interface';
import { IAcademicSemester } from './academicSemister.interface';
import { AcademicSemesterSchema } from './academicSemister.schema';

export const AcademicSemister = model<IAcademicSemester, IUserStatics>('Academic-Semester', AcademicSemesterSchema);