import { getFilesFromDirectoryFiles } from '../getFilesFromDirectoryFiles/getFilesFromDirectoryFiles';
import { readAllFilesOfDirectory } from '../readAllFilesOfDirectory/readAllFilesOfDirectory';

export const getFilesOfDirectoryRecursively = (directory: string): string[] => {
    const directoryFiles = readAllFilesOfDirectory(directory);
    const files = getFilesFromDirectoryFiles(directory, directoryFiles);
    return files;
};
