import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import sendResponse from "../../shared/sendResponse";
import { IAcademicFaculty, IFilterOptions, IPaginationOptions } from "./academicFaculty.interface";
import { createFaculty, deleteFaculty, getAllFaculty, getSingleFaculty, updateFaculty } from "./academicFaculty.service";
import { validateObjectId, validateUpdateFacultyObject } from "./academicFaculty.validator";

export const createAcademicFacultyController = catchAsync(async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;
    const result = await createFaculty(academicFacultyData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Academic faculty is created successfully"
    });
});

export const getAllAcademicFacultyController = catchAsync(async (req: Request, res: Response) => {
    const paginationOptions: IPaginationOptions = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filterOptions: IFilterOptions = pick(req.query, ['searchTerm', 'title']);
    const result = await getAllFaculty(paginationOptions, filterOptions);
    sendResponse<IAcademicFaculty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result.data,
        meta: result.meta,
        message: "Faculty retrieved successfully"
    });
});

export const getSingleAcademicFacultyController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleFaculty(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: `Successfully retrieved faculty with id ${id}`
    });
});

export const updateAcademicFacultyController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    validateObjectId(id);
    validateUpdateFacultyObject(req.body);
    const body: IAcademicFaculty = req.body;
    const result = await updateFaculty(id, body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Successfully updated the faculty with id ${id}`,
        data: result
    });
});

export const deleteAcademicFacultyController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    validateObjectId(id);
    const result = await deleteFaculty(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Successfully deleted the faculty with id ${id}`,
        data: result
    });
});
