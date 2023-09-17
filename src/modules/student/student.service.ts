import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { ApiError } from '../../errors/ApiError';
import paginationHelpers from '../../helpers/paginationHelpers';
import { IFilterOptions, IGenericStudentResponse, IPaginationOptions, IStudent } from './student.interface';
import { Student } from './student.model';

export const getAllStudent = async (paginationOptions: IPaginationOptions, filterOptions: IFilterOptions): Promise<IGenericStudentResponse<IStudent[]>> => {
    const { searchTerm, ...filterData } = filterOptions;
    const searchFields = ['name.firstName', 'name.lastName', 'id', 'contactNo', 'email', 'name.middleName'];
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
    const result = await Student.find(conditions.length ? { $and: conditions } : {}).populate('academicFaculty').populate('academicDepartment').populate('academicSemester').sort(sortOption).skip(skip).limit(Number(limit));
    const total = await Student.estimatedDocumentCount(conditions.length ? { $and: conditions } : {});
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total
        },
        data: result
    };
};

export const getSingleStudent = async (id: string): Promise<IStudent | null> => {
    const result = await Student.findById(id);
    return result;
};

export const updateStudent = async (id: string, data: IStudent): Promise<IStudent | null> => {

    const isExist = await Student.findById(id);
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
    }
    const { name, guardian, localGuardian, ...studentData } = data;
    const updatedStudent: Partial<IStudent> = { ...studentData };
    if (name && Object.keys(name).length) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}` as keyof Partial<IStudent>;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (updatedStudent as any)[nameKey] = name[key as keyof typeof name];
        });
    }
    if (guardian && Object.keys(guardian).length) {
        Object.keys(guardian).forEach(key => {
            const guardinKey = `guardian.${key}` as keyof Partial<IStudent>;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (updatedStudent as any)[guardinKey] = guardian[key as keyof typeof guardian];
        });
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        Object.keys(localGuardian).forEach(key => {
            const localGuardianKey = `localGuardian.${key}` as keyof Partial<IStudent>;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (updatedStudent as any)[localGuardianKey] = localGuardian[key as keyof typeof localGuardian];
        });
    }
    const result = await Student.findByIdAndUpdate({ id }, data, { new: true });
    return result;
};

export const deleteStudent = async (id: string): Promise<IStudent | null> => {
    const result = await Student.findByIdAndDelete(id);
    return result;
};
