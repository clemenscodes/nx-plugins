import { isValidGccOutput } from './isValidGccOutput/isValidGccOutput';

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
