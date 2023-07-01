import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { ApiError } from "../errors/ApiError";
import handleValidationError from "../errors/handleValidationError";
import { IGenericErrorResponse } from "../interfaces/common";

const globalErrorHandler: ErrorRequestHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {

    let responseObj: IGenericErrorResponse = {
        statusCode: 500,
        message: "Something went wrong!",
        errorMessages: []
    };

    if (err?.name === 'ValidationError' && err instanceof Error.ValidationError) {
        const simplifiedError = handleValidationError(err);
        responseObj = { ...simplifiedError };
    } else if (err instanceof Error) {
        responseObj = { ...responseObj, message: err.message, errorMessages: err?.message ? [{ path: '', message: err?.message }] : [] };
    } else if (err instanceof ApiError) {
        responseObj = { statusCode: err.statusCode, message: err.message, errorMessages: err?.message ? [{ path: '', message: err?.message }] : [] };
    }

    res.status(responseObj.statusCode).json({ ...responseObj });
    next();
};

export default globalErrorHandler;