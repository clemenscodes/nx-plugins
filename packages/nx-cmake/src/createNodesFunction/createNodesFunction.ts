import type { CreateNodesFunction } from '@nx/devkit';
import { PROJECT_FILE } from '../config/projectFilePattern';
import { getProjectType } from '../utils/generatorUtils/getProjectType/getProjectType';
import { getProjectConfiguration } from '../utils/generatorUtils/getProjectConfiguration/getProjectConfiguration';

export const createNodesFunction: CreateNodesFunction = (
    projectConfigurationFile: string
) => {
    const [root] = projectConfigurationFile.split(`/${PROJECT_FILE}`);
    const type = getProjectType(projectConfigurationFile);
    const projects = getProjectConfiguration(root, type);
    return { projects };
};
