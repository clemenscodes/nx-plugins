import type { CreateNodesContext, CreateNodesFunction } from '@nx/devkit';
import { projectFile } from '../config/projectFilePattern';
import { getProjectType } from '../utils/generatorUtils/getProjectType/getProjectType';
import { getProjectConfiguration } from '../utils/generatorUtils/getProjectConfiguration/getProjectConfiguration';

export const createNodesFunction: CreateNodesFunction = (
    projectConfigurationFile: string,
    context: CreateNodesContext
) => {
    context;
    const [root] = projectConfigurationFile.split(`/${projectFile}`);
    const type = getProjectType(root);
    const projects = getProjectConfiguration(root, type);
    return { projects };
};
