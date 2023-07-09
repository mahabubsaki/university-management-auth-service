import { model } from 'mongoose';
import { IAcademicDepartment, IAcademicDepartmentStatics } from './academicDepartment.interface';
import { AcademicDepartmentSchema } from './academicDepartment.schema';

export const AcademicDepartment = model<IAcademicDepartment, IAcademicDepartmentStatics>('AcademicDepartment', AcademicDepartmentSchema);
