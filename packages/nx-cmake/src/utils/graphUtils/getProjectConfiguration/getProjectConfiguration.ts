import type { ProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '../../../models/types';
import { getProjectName } from '../getProjectName/getProjectName';
import { getProjectTargets } from '../../getProjectTargets/getProjectTargets';
import { getProjectConfigurationType } from '../getProjectConfigurationType/getProjectConfigurationType';

export const getProjectConfiguration = (
    root: string,
    type: CProjectType
): Record<string, ProjectConfiguration> => {
    const sourceRoot = `${root}/src`;
    const name = getProjectName(type, root);
    const targets = getProjectTargets(type);
    const projectType = getProjectConfigurationType(type);
    const project: Record<string, ProjectConfiguration> = {
        [name]: {
            name,
            root,
            sourceRoot,
            projectType,
            targets,
        },
    };
    return project;
};
