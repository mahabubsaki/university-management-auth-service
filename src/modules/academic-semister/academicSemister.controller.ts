import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import sendResponse from "../../shared/sendResponse";
import validateObjectId from "../../shared/validateObjectId";
import { IAcademicSemester, IFilterOptions, IPaginationOptions } from "./academicSemister.interface";
import { createSemester, deleteSemester, getAllSemester, getSingleSemester, updateSemester } from "./academicSemister.service";
import { validateSemisterObject, validateUpdateSemesterObject } from "./academicSemister.validator";

export const createSemesterController = catchAsync(async (req: Request, res: Response) => {

    const { ...academicSemisterData } = req.body;
    const result = await createSemester(academicSemisterData);
    sendResponse<Partial<IAcademicSemester>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Academic semester is created successfully"
    });
});

export const getAllSemesterController = catchAsync(async (req: Request, res: Response) => {
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



});

export const getSingleSemesterControler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleSemester(id);
    sendResponse<Partial<IAcademicSemester>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: `Successfully retrieved semester with id ${id}`
    });
});

export const updateSemesterController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    validateObjectId(id);
    validateUpdateSemesterObject(req.body);
    validateSemisterObject(req.body);
    const body: IAcademicSemester = req.body;
    const result = await updateSemester(id, body);
    sendResponse<Partial<IAcademicSemester>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Successfully updated the semester with id ${id}`,
        data: result
    });
});

export const deleteSemesterController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    validateObjectId(id);
    const result = await deleteSemester(id);
    sendResponse<Partial<IAcademicSemester>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Successfully deleted the semester with id ${id}`,
        data: result
    });
});