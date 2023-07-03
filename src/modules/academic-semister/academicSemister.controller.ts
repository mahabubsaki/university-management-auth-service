import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import sendResponse from "../../shared/sendResponse";
import { IAcademicSemester, IFilterOptions, IPaginationOptions } from "./academicSemister.interface";
import { createSemester, getAllSemester } from "./academicSemister.service";

export const createSemesterController = catchAsync(async (req: Request, res: Response) => {

    const { ...academicSemisterData } = req.body;
    const result = await createSemester(academicSemisterData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Academic semester is created successfully"
    });
});

export const getAllSemesterController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions: IPaginationOptions = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filterOptions: IFilterOptions = pick(req.query, ['searchTerm', 'title', 'code', 'year']);
    const result = await getAllSemester(paginationOptions, filterOptions);
    sendResponse<IAcademicSemester[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result.data,
        meta: result.meta,
        message: "Semester retrived successfully"
    });

    next();

});