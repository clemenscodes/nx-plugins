import { CProjectType } from '@/types';
import { getWorkspaceLayout } from '@/util';

export const getProjectRoot = (
    projectName: string,
    projectType: CProjectType,
): string => {
    const { appsDir, libsDir } = getWorkspaceLayout();

    if (projectType === CProjectType.App) {
        return `${appsDir}/${projectName}`;
    }

    if (projectType === CProjectType.Lib) {
        return `${libsDir}/${projectName}`;
    }

    if (projectType === CProjectType.Test) {
        return `${appsDir}/${projectName}`;
    }

    throw new Error(`Failed to get project root of project ${projectName}`);
};
