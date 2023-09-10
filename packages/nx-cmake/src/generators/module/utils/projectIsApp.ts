import type { ProjectType } from '@nx/devkit';

export const projectIsApp = (projectType: ProjectType): boolean => {
    return projectType === 'application';
};
