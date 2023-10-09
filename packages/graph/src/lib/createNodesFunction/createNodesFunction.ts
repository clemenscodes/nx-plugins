import type { CreateNodesFunction } from '@nx/devkit';
import { PROJECT_FILE } from '@/config';
import { getProjectConfiguration, getProjectTypeAndVariant } from '@/utils';

export const createNodesFunction: CreateNodesFunction = (
    projectConfigurationFile: string,
) => {
    const [root] = projectConfigurationFile.split(`/${PROJECT_FILE}`);
    const [type, language] = getProjectTypeAndVariant(projectConfigurationFile);
    const projects = getProjectConfiguration(root, type, language);
    return { projects };
};
