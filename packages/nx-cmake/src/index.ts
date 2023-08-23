import {
    type NxPluginV2,
    type CreateNodes,
    type CreateDependencies,
    type CreateNodesFunction,
    type ProjectGraphDependencyWithFile,
    type CreateDependenciesContext,
    type ProjectConfiguration,
} from '@nx/devkit';
import { PLUGIN_NAME } from './config/pluginName';
import { projectFile, projectFilePattern } from './config/projectFilePattern';
import { getProjectType } from './utils/getProjectType/getProjectType';
import { getProjectTargets } from './utils/getProjectTargets/getProjectTargets';
import { CProjectType } from './models/types';
import { filterProjects } from './utils/graphUtils/filterProjects/filterProjects';
import { getDependencies } from './utils/graphUtils/getDependencies/getDependencies';

const createNodesFunction: CreateNodesFunction = (
    projectConfigurationFile: string
) => {
    const [root] = projectConfigurationFile.split(`/${projectFile}`);
    const projectNameSplit = root.split('/');
    const projectName = projectNameSplit.pop();
    const type = getProjectType(root);
    const testProjectName = `test${projectNameSplit.pop()}`;
    const name =
        type === CProjectType.Lib
            ? `lib${projectName}`
            : type === CProjectType.Test
            ? testProjectName
            : projectName;
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

const createNodes: CreateNodes = [projectFilePattern, createNodesFunction];

const createDependencies: CreateDependencies = async (
    context: CreateDependenciesContext
): Promise<ProjectGraphDependencyWithFile[]> => {
    const { graph, nxJsonConfiguration } = context;
    const { workspaceLayout } = nxJsonConfiguration;
    const { libsDir } = workspaceLayout;
    const { nodes } = graph;
    const filteredProjects = filterProjects(nodes);
    const deps = await getDependencies(libsDir, context, filteredProjects);
    return deps;
};

const nxPlugin: NxPluginV2 = {
    name: PLUGIN_NAME,
    createNodes,
    createDependencies,
};

export = nxPlugin;
