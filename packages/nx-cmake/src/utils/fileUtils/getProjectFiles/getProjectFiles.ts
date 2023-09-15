import { getAbsolutePath } from '../getAbsolutePath/getAbsolutePath';
import { getFilesOfDirectoryRecursively } from '../getFilesOfDirectoryRecursively/getFilesOfDirectoryRecursively';

export const getProjectFiles = (
    workspaceRoot: string,
    projectRoot: string
): string[] => {
    if (!(workspaceRoot && projectRoot)) {
        return [];
    }
    const fullProjectRoot = getAbsolutePath(workspaceRoot, projectRoot);
    const files = getFilesOfDirectoryRecursively(fullProjectRoot);
    return files;
};
