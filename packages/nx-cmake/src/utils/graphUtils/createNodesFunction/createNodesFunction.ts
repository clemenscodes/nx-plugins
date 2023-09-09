import type { CreateNodesFunction } from '@nx/devkit';
import { getProjectType } from '../../getProjectType/getProjectType';
import { projectFile } from '../../../config/projectFilePattern';
import { getProjectConfiguration } from '../getProjectConfiguration/getProjectConfiguration';

export const createNodesFunction: CreateNodesFunction = (
    projectConfigurationFile: string
) => {
    const [root] = projectConfigurationFile.split(`/${projectFile}`);
    const type = getProjectType(root);
    const projects = getProjectConfiguration(root, type);
    return { projects };
};
