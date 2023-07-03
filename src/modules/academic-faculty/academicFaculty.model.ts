import { model } from 'mongoose';
import { IAcademicFaculty, IAcademicFacultyStatics } from './academicFaculty.interface';
import { AcademicFacultySchema } from './academicFaculty.schema';

export const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultyStatics>('AcademicFaculty', AcademicFacultySchema);
