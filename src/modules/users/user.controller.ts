import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { createUser } from "./user.service";

export const createUserController = catchAsync(async (req: Request, res: Response) => {
    const { user } = req.body;
    const result = await createUser(user);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "User created successfully"
    });
    ;
});
