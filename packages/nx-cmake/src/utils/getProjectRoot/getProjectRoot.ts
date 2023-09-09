import { CProjectType } from '../../models/types';
import { getWorkspaceLayout } from '../getWorkspaceLayout/getWorkspaceLayout';

export const getProjectRoot = (
    projectName: string,
    projectType: CProjectType
): string => {
    const { appsDir, libsDir, projectNameAndRootFormat } = getWorkspaceLayout();

    if (projectType === CProjectType.App) {
        return projectNameAndRootFormat === 'as-provided'
            ? projectName
            : `${appsDir}/${projectName}`;
    }

    if (projectType === CProjectType.Lib) {
        return `${libsDir}/${projectName}`;
    }

    if (projectType === CProjectType.Test) {
        return projectNameAndRootFormat === 'as-provided'
            ? `test${projectName}`
            : `${libsDir}/${projectName}/test`;
    }

    return projectNameAndRootFormat === 'as-provided'
        ? projectName
        : `${libsDir}/${projectName}`;
};
