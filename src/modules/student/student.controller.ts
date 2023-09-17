import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import sendResponse from "../../shared/sendResponse";
import validateObjectId from "../../shared/validateObjectId";

import { IFilterOptions, IPaginationOptions, IStudent } from "./student.interface";
import { deleteStudent, getAllStudent, getSingleStudent, updateStudent } from "./student.service";

export const getAllStudentsController = catchAsync(async (req: Request, res: Response) => {
    const paginationOptions: IPaginationOptions = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filterOptions: IFilterOptions = pick(req.query, ['searchTerm', 'id', 'gender', 'bloodGroup', 'email', 'contactNo', 'emergencyContactNo']);
    const result = await getAllStudent(paginationOptions, filterOptions);
    sendResponse<IStudent[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result.data,
        meta: result.meta,
        message: 'Students retrieved successfully',
    });
});

export const updateStudentController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    validateObjectId(id);
    const body: IStudent = req.body;
    const result = await updateStudent(id, body);
    sendResponse<Partial<IStudent>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Successfully updated the semester with id ${id}`,
        data: result
    });
});

export const getSingleStudentController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleStudent(id);
    sendResponse<Partial<IStudent>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: `Successfully retrieved student with id ${id}`,
    });
});

export const deleteStudentController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    validateObjectId(id);
    const result = await deleteStudent(id);
    sendResponse<Partial<IStudent>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Successfully deleted the student with id ${id}`,
        data: result,
    });
});