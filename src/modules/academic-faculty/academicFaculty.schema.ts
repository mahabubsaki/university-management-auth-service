import httpStatus from 'http-status';
import { Schema } from "mongoose";
import { ApiError } from "../../errors/ApiError";
import { IAcademicFaculty, IAcademicFacultyMethods, IAcademicFacultyStatics } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

export const AcademicFacultySchema = new Schema<IAcademicFaculty, IAcademicFacultyStatics, IAcademicFacultyMethods>(
    {
        title: { type: String, required: true },
    },
    { timestamps: true }
);

AcademicFacultySchema.pre('save', async function (next) {
    const isExist = await AcademicFaculty.findOne({ email: this.title });
    if (isExist) {
        throw new ApiError(httpStatus.CONFLICT, "Academic faculty with this title already exists!");
    }
    next();
});
