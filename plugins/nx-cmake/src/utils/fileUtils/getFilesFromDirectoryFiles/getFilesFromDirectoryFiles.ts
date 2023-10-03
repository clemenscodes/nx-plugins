import { getAbsolutePath } from '../getAbsolutePath/getAbsolutePath';
import { getNestedFiles } from '../getNestedFiles/getNestedFiles';

export const getFilesFromDirectoryFiles = (
    directory: string,
    directoryFiles: string[],
): string[] => {
    const files = [];
    for (const file of directoryFiles) {
        const absolutePath = getAbsolutePath(directory, file);
        const nestedFiles = getNestedFiles(absolutePath);
        files.push(...nestedFiles);
    }
    return files;
};
