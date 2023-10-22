import { output, type CreateNodesFunction } from '@nx/devkit';
import { PROJECT_FILE } from '../../config';
import { getProjectConfiguration } from '../../utils/getProjectConfiguration/getProjectConfiguration';
import { getProjectTypeAndVariant } from '../../utils/getProjectTypeAndVariant/getProjectTypeAndVariant';

export const createNodesFunction: CreateNodesFunction = (
    projectConfigurationFile: string,
) => {
    try {
        const [root] = projectConfigurationFile.split(`/${PROJECT_FILE}`);
        const [type, language] = getProjectTypeAndVariant(
            projectConfigurationFile,
        );
        const projects = getProjectConfiguration(root, type, language);
        return { projects };
    } catch (e) {
        output.error({
            title: `Failed to create project node for ${projectConfigurationFile}`,
        });
        return { projects: {} };
    }
};
