import { CreateNodes, type NxPluginV2 } from '@nx/devkit';
import { PLUGIN_NAME } from './config/pluginName';
import { createDependencies } from './utils/createDependencies/createDependencies';
import { projectFilePattern } from './config/projectFilePattern';
import { createNodesFunction } from './utils/createNodesFunction/createNodesFunction';

const createNodes: CreateNodes = [projectFilePattern, createNodesFunction];

const nxPlugin: NxPluginV2 = {
    name: PLUGIN_NAME,
    createNodes,
    createDependencies,
};

export = nxPlugin;
