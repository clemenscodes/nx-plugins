import { readdirSync } from 'fs';

export const readAllFilesOfDirectory = (directory: string): string[] => {
    const directoryFiles = readdirSync(directory);
    return directoryFiles;
};
