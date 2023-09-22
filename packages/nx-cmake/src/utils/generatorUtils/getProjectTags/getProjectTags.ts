import type { ProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '../../../models/types';

export const getProjectTags = (
    projectType: CProjectType,
): ProjectConfiguration['tags'] => {
    const tags = projectType === CProjectType.Test ? ['test'] : [];
    return tags;
};
