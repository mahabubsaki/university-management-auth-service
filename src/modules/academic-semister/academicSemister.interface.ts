import { Model } from "mongoose";

export interface IAcademicSemester {
    title: string,
    year: number,
    code: string,
    startMonth: string;
    endMonth: string;
}
export interface IAcademicSemesterMethods {
    demo: () => string;
}

export interface IAcademicSemesterStatics extends Model<IAcademicSemester, object, IAcademicSemesterMethods> {
    demo: () => string;
}
