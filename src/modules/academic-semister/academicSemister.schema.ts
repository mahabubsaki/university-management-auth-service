import { Schema } from "mongoose";
import { IAcademicSemester, IAcademicSemesterMethods, IAcademicSemesterStatics } from "./academicSemister.interface";

export const AcademicSemesterSchema = new Schema<IAcademicSemester, IAcademicSemesterStatics, IAcademicSemesterMethods>(
    {
        title: { type: String, required: true },
        year: { type: Number, required: true },
        code: { type: String, required: true },
        startMonth: { type: String, required: true },
        endMonth: { type: String, required: true },
    },
    { timestamps: true }
);
