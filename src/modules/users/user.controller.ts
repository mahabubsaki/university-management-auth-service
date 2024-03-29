import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IStudent } from "../student/student.interface";
import { createStudent } from "./user.service";

export const createStudentController = catchAsync(async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await createStudent(student, userData);


    sendResponse<Partial<IStudent>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "User created successfully"
    });
    ;
});
