import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { authLogin } from "./auth.service";

export const authLoginController = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await authLogin(loginData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "User Login successfully"
    });
});
