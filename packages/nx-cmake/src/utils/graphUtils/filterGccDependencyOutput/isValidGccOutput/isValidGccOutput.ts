export const isValidGccOutput = (
    chunk: string,
    originalFile: string
): boolean => {
    return (
        /\.(h|c|cpp)/.test(chunk) &&
        chunk !== originalFile &&
        !chunk.includes('.o') &&
        !chunk.startsWith('include/') &&
        !chunk.startsWith('/usr/') &&
        !chunk.startsWith('dist/')
    );
};
