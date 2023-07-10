import { SortOrder } from "mongoose";
import paginationHelpers from "../../helpers/paginationHelpers";
import { IAcademicFaculty, IFilterOptions, IGenericAcademicFacultyResponse, IPaginationOptions } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

export const createFaculty = async (payload: IAcademicFaculty): Promise<IAcademicFaculty> => {
    const result = await AcademicFaculty.create(payload);
    return result;
};

export const getAllFaculty = async (paginationOptions: IPaginationOptions, filterOptions: IFilterOptions): Promise<IGenericAcademicFacultyResponse<IAcademicFaculty[]>> => {
    const { searchTerm, ...filterData } = filterOptions;
    const searchFields = ['title'];
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
    const result = await AcademicFaculty.find(conditions.length ? { $and: conditions } : {}).sort(sortOption).skip(skip).limit(Number(limit));
    const total = await AcademicFaculty.estimatedDocumentCount();
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total
        },
        data: result
    };
};

export const getSingleFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.findById(id);
    return result;
};

export const updateFaculty = async (id: string, body: IAcademicFaculty) => {
    const result = (await AcademicFaculty.findByIdAndUpdate(id, body, { new: true }))?.populate('academicFaculty');
    return result;
};

export const deleteFaculty = async (id: string) => {
    const result = await AcademicFaculty.findByIdAndDelete(id);
    return result;
};
