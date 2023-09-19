import type { ProjectFileMap } from '@nx/devkit';
import type { CTag } from '../../../../models/types';
import { isValidProjectFile } from '../isvalidProjectFile/isValidProjectFile';

export const getProjectFiles = (
    projectName: string,
    tag: CTag,
    fileMap: ProjectFileMap
): string[] => {
    const files = fileMap[projectName];
    const projectFiles = files
        .map(({ file }) => file)
        .filter((file) => isValidProjectFile(file, tag));

    return projectFiles;
};
