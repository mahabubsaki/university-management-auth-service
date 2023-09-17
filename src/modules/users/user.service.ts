import httpStatus from "http-status";
import { startSession } from "mongoose";
import config from "../../config";
import { ApiError } from "../../errors/ApiError";
import { AcademicSemister } from "../academic-semister/academicSemister.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateUserId } from "./user.utils";


export const createStudent = async (student: IStudent, user: IUser): Promise<IUser | null> => {
    if (!user.password) {
        user.password = config.default_student_password as string;
    }

    user.role = 'student';
    const academicSemester = await AcademicSemister.findById(student.academicSemester);
    let newUserAllData: IUser | null = null;
    const session = await startSession();
    try {
        session.startTransaction();
        const id = await generateUserId(academicSemester, 'student');
        user.id = id;
        student.id = id;
        const createdStudent = await Student.create([student], { session });
        if (!createStudent.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create student");
        }

        user.student = createdStudent[0]._id;

        const createdUser = await User.create([user], { session });
        if (!createdUser.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
        }
        newUserAllData = createdUser[0];
        await session.commitTransaction();
        await session.endSession();
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
    if (newUserAllData) {
        // this is a way to populate nested field -- 
        //here student is a reference field which will give us student info from model. Now student info has also 3 reference field like academicSemester,academicDepartment and academicFaculty. Those fields also has been populated
        newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({ path: 'student', populate: [{ path: 'academicSemester' }, { path: 'academicDepartment' }, { path: 'academicFaculty' }] });
    }
    return newUserAllData;
};
