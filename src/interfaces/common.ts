import { IGenericError } from "./error";

export interface IGenericErrorResponse {
    statusCode: number,
    message: string,
    errorMessages: IGenericError[],
    stack?: string;
}