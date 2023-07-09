import { SortOrder } from "mongoose";
import paginationHelpers from "../../helpers/paginationHelpers";
import { IAcademicDepartment, IFilterOptions, IGenericAcademicDepartmentResponse, IPaginationOptions } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

export const createDepartment = async (payload: IAcademicDepartment): Promise<IAcademicDepartment> => {
    const result = await AcademicDepartment.create(payload);
    return result;
};

export const getAllDepartments = async (paginationOptions: IPaginationOptions, filterOptions: IFilterOptions): Promise<IGenericAcademicDepartmentResponse<IAcademicDepartment[]>> => {
    const { searchTerm, ...filterData } = filterOptions;
    const searchFields = ['title', 'academicFaculty'];
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
    const result = await AcademicDepartment.find(conditions.length ? { $and: conditions } : {}).sort(sortOption).skip(skip).limit(Number(limit));
    const total = await AcademicDepartment.estimatedDocumentCount();
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total
        },
        data: result
    };
};

export const getSingleDepartment = async (id: string): Promise<IAcademicDepartment | null> => {
    const result = await AcademicDepartment.findById(id);
    return result;
};

export const updateDepartment = async (id: string, body: IAcademicDepartment): Promise<IAcademicDepartment | null> => {
    const result = await AcademicDepartment.findByIdAndUpdate(id, body, { new: true });
    return result;
};

export const deleteDepartment = async (id: string): Promise<IAcademicDepartment | null> => {
    const result = await AcademicDepartment.findByIdAndDelete(id);
    return result;
};
