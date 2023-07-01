import { Error } from "mongoose";
import { IGenericErrorResponse } from "../interfaces/common";
import { IGenericError } from "../interfaces/error";

export default function handleValidationError(err: Error.ValidationError): IGenericErrorResponse {
    const errors: IGenericError[] = Object.values(err.errors).map(value => {
        return {
            path: value.path,
            message: value.message
        };
    });
    return {
        statusCode: 400,
        message: 'Validation Error',
        errorMessages: errors
    };
};