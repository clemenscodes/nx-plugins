export const isValidGccOutput = (chunk: string): boolean => {
    return (
        /\.(h|c|cpp)/.test(chunk) &&
        !chunk.includes('.o') &&
        !chunk.startsWith('/usr/') &&
        !chunk.startsWith('dist/')
    );
};

export const filterGccDependencyOutput = (output: string): string[] => {
    const filteredOutput = output
        .split(' ')
        .filter(isValidGccOutput)
        .map((line) => line.trim());
    return filteredOutput;
};
