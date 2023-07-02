import { Model } from "mongoose";

export interface IAcademicSemester {
    title: 'Autumn' | 'Summer' | 'Fall',
    year: number,
    code: '01' | '02' | '03',
    startMonth: 'January' | 'May' | 'September';
    endMonth: 'April' | 'August' | 'December';
}


export interface IAcademicSemesterMethods {
    demo: () => string;
}

export interface IAcademicSemesterStatics extends Model<IAcademicSemester, object, IAcademicSemesterMethods> {
    demo: () => string;
}
