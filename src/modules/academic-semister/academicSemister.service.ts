import { IAcademicSemester, IGenericAcademicSemesterResponse, IPaginationOptions } from "./academicSemister.interface";
import { AcademicSemister } from "./academicSemister.model";
import { validateSemisterObject } from "./academicSemister.validator";

export const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    validateSemisterObject(payload);
    const result = await AcademicSemister.create(payload);
    return result;
};

export const getAllSemester = async (options: IPaginationOptions): Promise<IGenericAcademicSemesterResponse<IAcademicSemester[]>> => {
    const { limit = 10, page = 1 } = options;
    const skip = (Number(page) - 1) * Number(limit);
    const result = await AcademicSemister.find().sort().skip(skip).limit(Number(limit));
    const total = await AcademicSemister.estimatedDocumentCount();
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total
        },
        data: result
    };
};