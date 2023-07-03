import { Response } from "express";

interface IApiResponse<T> {
    statusCode: number,
    success: boolean,
    message?: string | null;
    data?: T | null;
    meta?: {
        page: number,
        limit: number,
        total: number;
    };
}

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        data: data.data,
        meta: data.meta
    };
    res.status(data.statusCode).json(responseData);
};

export default sendResponse;