import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { createSemester } from "./academicSemister.service";

export const createSemesterController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { ...academicSemisterData } = req.body;
    const result = await createSemester(academicSemisterData);
    next();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Academic semester is created successfully"
    });


});