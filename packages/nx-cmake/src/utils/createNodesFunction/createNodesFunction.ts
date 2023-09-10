import type { CreateNodesFunction } from '@nx/devkit';
import { getProjectConfiguration } from '../getProjectConfiguration/getProjectConfiguration';
import { projectFile } from '../../config/projectFilePattern';
import { getProjectType } from '../getProjectType/getProjectType';

export const createNodesFunction: CreateNodesFunction = (
    projectConfigurationFile: string
) => {
    const [root] = projectConfigurationFile.split(`/${projectFile}`);
    const type = getProjectType(root);
    const projects = getProjectConfiguration(root, type);
    return { projects };
};
