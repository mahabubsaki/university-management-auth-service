import httpStatus from "http-status";
import { Types } from "mongoose";
import { ApiError } from "../errors/ApiError";

const validateObjectId = (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ObjectID Given");
    }
};
export default validateObjectId;