import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { authLogin, createRefreshToken } from "./auth.service";

export const authLoginController = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;

    const { refreshToken, ...result } = await authLogin(loginData);
    // setting refresh token into cookie
    res.cookie('refreshToken', refreshToken, { secure: config.env == 'production' ? true : false, httpOnly: true });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "User Login successfully"
    });
});
export const refreshTokenController = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await createRefreshToken(refreshToken);
    res.cookie('refreshToken', refreshToken, { secure: config.env == 'production' ? true : false, httpOnly: true });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "User Login successfully"
    });
});

