import type { ProjectConfiguration } from '@nx/devkit';
import type { C } from '@/types';
import { CProjectType } from '@/types';
import { getProjectTargets } from '../getProjectTargets/getProjectTargets';
import { getProjectTags } from '../getProjectTags/getProjectTags';
import { getProjectConfigurationType, getProjectName } from '@/util';

export const getProjectConfiguration = (
    root: string,
    type: CProjectType,
    language: C,
): Record<string, ProjectConfiguration> => {
    const sourceRoot = `${root}/src`;
    const name = getProjectName(type, root);
    const targets = getProjectTargets(type);
    const projectType = getProjectConfigurationType(type);
    const tags = getProjectTags(type, language);
    const project: Record<string, ProjectConfiguration> = {
        [name]: {
            name,
            root,
            sourceRoot,
            projectType,
            targets,
            tags,
        },
    };
    return project;
};
