import type { ProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '@/config';

export const getProjectTypeFromConfig = (
    projectConfig: ProjectConfiguration,
): CProjectType => {
    const { tags, projectType } = projectConfig;
    if (projectType === 'library') {
        return CProjectType.Lib;
    }
    if (tags && tags.includes('test')) {
        return CProjectType.Test;
    }
    return CProjectType.App;
};
