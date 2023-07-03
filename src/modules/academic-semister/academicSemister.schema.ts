import httpStatus from 'http-status';
import { Schema } from "mongoose";
import { ApiError } from "../../errors/ApiError";
import { IAcademicSemester, IAcademicSemesterMethods, IAcademicSemesterStatics } from "./academicSemister.interface";
import { AcademicSemister } from "./academicSemister.model";

export const AcademicSemesterSchema = new Schema<IAcademicSemester, IAcademicSemesterStatics, IAcademicSemesterMethods>(
    {
        title: { type: String, required: true, enum: ['Autumn', 'Summer', 'Fall'] },
        year: { type: String, required: true },
        code: { type: String, required: true, enum: ['01', '02', '03'] },
        startMonth: { type: String, required: true, enum: ['January', 'May', 'September'] },
        endMonth: { type: String, required: true, enum: ['April', 'August', 'December'] },
    },
    { timestamps: true }
);


AcademicSemesterSchema.pre('save', async function (next) {
    const isExist = await AcademicSemister.findOne({ title: this.title, year: this.year });
    if (isExist) {
        throw new ApiError(httpStatus.CONFLICT, "Academic semester is already exist!");
    }
    next();
});