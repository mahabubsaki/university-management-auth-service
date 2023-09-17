import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import sendResponse from "../../shared/sendResponse";
import validateObjectId from "../../shared/validateObjectId";
import { IAcademicDepartment } from "./academicDepartment.interface";
import { createDepartment, deleteDepartment, getAllDepartments, getSingleDepartment, updateDepartment } from "./academicDepartment.service";
import { validateUpdateDepartmentObject } from "./academicDepartment.validator";

export const createAcademicDepartmentController = catchAsync(async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;
    const result = await createDepartment(academicDepartmentData);
    sendResponse<Partial<IAcademicDepartment>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Academic department created successfully"
    });
});

export const getAllAcademicDepartmentsController = catchAsync(async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const filterOptions = pick(req.query, ["searchTerm", "title"]);
    const result = await getAllDepartments(paginationOptions, filterOptions);
    sendResponse<IAcademicDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result.data,
        meta: result.meta,
        message: "Academic departments retrieved successfully"
    });
});

export const getSingleAcademicDepartmentController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleDepartment(id);
    sendResponse<Partial<IAcademicDepartment>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: `Successfully retrieved academic department with id ${id}`
    });
});

export const updateAcademicDepartmentController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    validateObjectId(id);
    validateUpdateDepartmentObject(req.body);
    const body: IAcademicDepartment = req.body;
    const result = await updateDepartment(id, body);
    sendResponse<Partial<IAcademicDepartment>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Successfully updated the academic department with id ${id}`,
        data: result
    });
});

export const deleteAcademicDepartmentController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    validateObjectId(id);
    const result = await deleteDepartment(id);
    sendResponse<Partial<IAcademicDepartment>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Successfully deleted the academic department with id ${id}`,
        data: result
    });
});
