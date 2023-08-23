import type {
    NxPluginV2,
    CreateNodes,
    CreateDependencies,
    CreateNodesFunction,
    CreateNodesContext,
    ProjectGraphDependencyWithFile,
    CreateDependenciesContext,
} from '@nx/devkit';
import { PLUGIN_NAME } from './config/pluginName';
import { PATTERN } from './config/projectFilePatterns';

const createNodesFunction: CreateNodesFunction = (
    projectConfigurationFile: string,
    context: CreateNodesContext
) => {
    console.log({ projectConfigurationFile, context });
    return {};
};

const createNodes: CreateNodes = [PATTERN, createNodesFunction];

const createDependencies: CreateDependencies = (
    context: CreateDependenciesContext
): ProjectGraphDependencyWithFile[] => {
    console.log({ context });
    return [];
};

const nxPlugin: NxPluginV2 = {
    name: PLUGIN_NAME,
    createNodes,
    createDependencies,
};

export = nxPlugin;
