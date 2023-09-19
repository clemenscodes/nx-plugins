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

export const filterGccDependencyOutput = (
    output: string,
    originalFile: string
): string[] => {
    const filteredOutput = output
        .split(' ')
        .map((line) => line.trim())
        .filter((file) => isValidGccOutput(file, originalFile));
    return filteredOutput;
};
