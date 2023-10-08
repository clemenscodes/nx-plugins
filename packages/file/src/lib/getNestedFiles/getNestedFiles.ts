import { getFilesOfDirectoryRecursively } from '../getFilesOfDirectoryRecursively/getFilesOfDirectoryRecursively';
import { pathIsDirectory } from '../pathIsDirectory/pathIsDirectory';

export const getNestedFiles = (absolutePath: string): string[] => {
    const nestedFiles = [];
    if (pathIsDirectory(absolutePath)) {
        const files = getFilesOfDirectoryRecursively(absolutePath);
        nestedFiles.push(...files);
    } else {
        nestedFiles.push(absolutePath);
    }
    return nestedFiles;
};
