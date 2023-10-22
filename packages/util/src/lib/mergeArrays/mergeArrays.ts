export const mergeArrays = <T>(
    existing: T[] | undefined,
    defaults: T[] | undefined,
): T[] => {
    const uniqueValues = new Set<T>();
    if (Array.isArray(existing)) {
        existing.forEach((element) => {
            uniqueValues.add(element);
        });
    }
    if (Array.isArray(defaults)) {
        defaults.forEach((element) => {
            uniqueValues.add(element);
        });
    }
    return Array.from(uniqueValues);
};
