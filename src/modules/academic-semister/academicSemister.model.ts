import { model } from 'mongoose';
import { IAcademicSemester, IAcademicSemesterStatics } from './academicSemister.interface';
import { AcademicSemesterSchema } from './academicSemister.schema';

export const AcademicSemister = model<IAcademicSemester, IAcademicSemesterStatics>('Academic-Semester', AcademicSemesterSchema);