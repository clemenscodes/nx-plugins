import { CreateNodes, type NxPluginV2 } from '@nx/devkit';
import { PLUGIN_NAME } from './config/pluginName';
import { projectFilePattern } from './config/projectFilePattern';
import { createNodesFunction } from './createNodesFunction/createNodesFunction';
import { createDependencies } from './createDependencies/createDependencies';

const createNodes: CreateNodes = [projectFilePattern, createNodesFunction];

const nxPlugin: NxPluginV2 = {
    name: PLUGIN_NAME,
    createNodes,
    createDependencies,
};

export = nxPlugin;
