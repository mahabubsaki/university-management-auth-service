import httpStatus from 'http-status';
import { Schema } from 'mongoose';
import { ApiError } from '../../errors/ApiError';
import { IAcademicDepartment, IAcademicDepartmentMethods, IAcademicDepartmentStatics } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

export const AcademicDepartmentSchema = new Schema<IAcademicDepartment, IAcademicDepartmentStatics, IAcademicDepartmentMethods>(
    {
        title: { type: String, required: true },
        academicFaculty: { type: String, required: true }
    },
    { timestamps: true }
);

AcademicDepartmentSchema.pre('save', async function (next) {
    const isExist = await AcademicDepartment.findOne({ academicFaculty: this.academicFaculty });
    if (isExist) {
        throw new ApiError(httpStatus.CONFLICT, 'Academic department with this title already exists!');
    }
    next();
});
