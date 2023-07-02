import { Document } from "mongoose";
import { IAcademicSemester } from "./academicSemister.interface";
import { AcademicSemister } from "./academicSemister.model";
import { validateSemisterObject } from "./academicSemister.validator";

export const createSemester = async (payload: IAcademicSemester): Promise<Document> => {
    validateSemisterObject(payload);
    const result = await AcademicSemister.create(payload);
    return result;
};