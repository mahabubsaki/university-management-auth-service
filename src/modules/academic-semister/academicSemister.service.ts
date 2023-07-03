import { SortOrder } from "mongoose";
import paginationHelpers from "../../helpers/paginationHelpers";
import { IAcademicSemester, IFilterOptions, IGenericAcademicSemesterResponse, IPaginationOptions } from "./academicSemister.interface";
import { AcademicSemister } from "./academicSemister.model";
import { validateSemisterObject } from "./academicSemister.validator";

export const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    validateSemisterObject(payload);
    const result = await AcademicSemister.create(payload);
    return result;
};

export const getAllSemester = async (paginationOptions: IPaginationOptions, filterOptions: IFilterOptions): Promise<IGenericAcademicSemesterResponse<IAcademicSemester[]>> => {
    const { searchTerm, ...filterData } = filterOptions;
    const searchFields = ['title', 'code', 'year'];
    const conditions = [];
    if (searchTerm) {
        conditions.push({
            $or: searchFields.map(item => ({
                [item]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        });
    }
    if (Object.keys(filterData).length) {
        conditions.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }

    const { skip, limit, page, sortBy, sortOrder } = paginationHelpers(paginationOptions);
    const sortOption: { [key: string]: SortOrder; } = {};
    sortOption[sortBy] = sortOrder;
    const result = await AcademicSemister.find(conditions.length ? { $and: conditions } : {}).sort(sortOption).skip(skip).limit(Number(limit));
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

export const getSingleSemester = async (id: string): Promise<IAcademicSemester | null> => {
    const result = await AcademicSemister.findById(id);
    return result;
};
export const updateSemester = async (id: string, body: IAcademicSemester) => {
    const result = await AcademicSemister.findByIdAndUpdate(id, body, { new: true });
    return result;
};
export const deleteSemester = async (id: string) => {
    const result = await AcademicSemister.findByIdAndDelete(id);
    return result;
};