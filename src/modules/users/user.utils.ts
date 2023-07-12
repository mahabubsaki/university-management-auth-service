import httpStatus from "http-status";
import { ApiError } from "../../errors/ApiError";
import { IAcademicSemester } from "../academic-semister/academicSemister.interface";
import { Counter } from "../users-counter/counter.model";

export const generateUserId = async (academicSemester: Partial<IAcademicSemester> | null, role: string): Promise<string> => {
    if (!academicSemester) {
        throw new ApiError(httpStatus.FAILED_DEPENDENCY, "No Academic semster found with given student information");
    }
    const counter = await Counter.findOneAndUpdate(
        { _id: 'userId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true, useFindAndModify: false }
    );

    const userId = counter.seq.toString().padStart(7, '0');
    if (role == 'student') {
        return (academicSemester.year || '2025').substring(2) + (academicSemester.code || '01') + userId;
    } else if (role == 'faculty') {
        return 'F-' + userId;
    }
    return 'A-' + userId;
};

