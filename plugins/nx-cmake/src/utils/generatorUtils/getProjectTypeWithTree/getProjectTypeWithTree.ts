import type { Tree } from '@nx/devkit';
import { readProjectConfiguration } from '@nx/devkit';
import { CProjectType } from '../../../models/types';
import { getProjectTypeFromConfig } from '../getProjectTypeFromConfig/getProjectTypeFromConfig';

export const getProjectTypeWithTree = (
    tree: Tree,
    projectName: string,
): CProjectType => {
    const projectConfig = readProjectConfiguration(tree, projectName);
    const projectType = getProjectTypeFromConfig(projectConfig);
    return projectType;
};
