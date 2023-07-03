import { SortOrder } from "mongoose";
import { IPaginationOptions } from "../modules/academic-semister/academicSemister.interface";

interface IPaginationHelperReturn {
    skip: number;
    sortBy: string;
    sortOrder: SortOrder;
    page: number;
    limit: number;
}

export default function (options: IPaginationOptions): IPaginationHelperReturn {
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 10);
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    return { page, skip, limit, sortBy, sortOrder };
}