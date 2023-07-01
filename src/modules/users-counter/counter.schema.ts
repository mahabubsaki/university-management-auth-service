import { Schema } from "mongoose";
import { CounterModel } from "./counter.interface";

export const counterSchema = new Schema<CounterModel>({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
});