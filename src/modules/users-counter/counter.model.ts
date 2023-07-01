import { model } from "mongoose";
import { counterSchema } from "./counter.schema";
import { CounterModel } from "./counter.interface";

export const Counter = model<CounterModel>('Counter', counterSchema);