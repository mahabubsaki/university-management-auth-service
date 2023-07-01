import { Document } from "mongoose";

export interface CounterModel extends Document {
    _id: string;
    seq: number;
}