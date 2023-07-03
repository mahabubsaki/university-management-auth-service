const pick = <T extends Record<string, unknown>, k extends keyof T>(obj: T, arr: k[]): Partial<T> => {
    const result: Partial<T> = {};
    arr.forEach(item => {
        if (obj && Object.hasOwnProperty.call(obj, item)) {
            result[item] = obj[item];
        }
    });
    return result;
};
export default pick;