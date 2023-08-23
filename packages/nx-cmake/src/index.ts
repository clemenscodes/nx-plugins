import type {
    NxPluginV2,
    CreateNodes,
    CreateDependencies,
    CreateNodesFunction,
    ProjectGraphDependencyWithFile,
    CreateDependenciesContext,
    ProjectConfiguration,
} from '@nx/devkit';
import { PLUGIN_NAME } from './config/pluginName';
import { projectFile, projectFilePattern } from './config/projectFilePattern';
import { projectTypeOfFile } from './utils/registerProjectTargets';
import { getProjectTargets } from './utils/getProjectTargets';
import { CProjectType } from './models/types';

const createNodesFunction: CreateNodesFunction = (
    projectConfigurationFile: string
): Record<string, ProjectConfiguration> => {
    const [root] = projectConfigurationFile.split(`/${projectFile}`);
    const name = root.split('/').pop();
    const type = projectTypeOfFile(root);
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
    console.log({ projects });
    return projects;
};

const createNodes: CreateNodes = [projectFilePattern, createNodesFunction];

const createDependencies: CreateDependencies = (
    context: CreateDependenciesContext
): ProjectGraphDependencyWithFile[] => {
    const { graph } = context;
    const { nodes } = graph;
    console.log({ nodes });
    return [];
};

const nxPlugin: NxPluginV2 = {
    name: PLUGIN_NAME,
    createNodes,
    createDependencies,
};

export = nxPlugin;
