import { Counter } from "../users-counter/counter.model";

export const generateUserId = async (): Promise<string> => {
    const counter = await Counter.findOneAndUpdate(
        { _id: 'userId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true, useFindAndModify: false }
    );

    const userId = counter.seq.toString().padStart(7, '0');
    return userId;
};

