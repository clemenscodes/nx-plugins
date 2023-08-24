import type { CreateNodesFunction, ProjectConfiguration } from '@nx/devkit';
import { getProjectTargets } from '../../getProjectTargets/getProjectTargets';
import { getProjectType } from '../../getProjectType/getProjectType';
import { getProjectName } from '../getProjectName/getProjectName';
import { projectFile } from '../../../config/projectFilePattern';
import { CProjectType } from '../../../models/types';

export const createNodesFunction: CreateNodesFunction = (
    projectConfigurationFile: string
) => {
    const [root] = projectConfigurationFile.split(`/${projectFile}`);
    const type = getProjectType(root);
    const name = getProjectName(type, root);
    const targets = getProjectTargets(type);
    const sourceRoot = `${root}/src`;
    const projectType: ProjectConfiguration['projectType'] =
        type === CProjectType.Lib ? 'library' : 'application';
    const projects: Record<string, ProjectConfiguration> = {
        [name]: {
            name,
            root,
            sourceRoot,
            projectType,
            targets,
        },
    };
    return { projects };
};
