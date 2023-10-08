import type { CreateNodes, NxPluginV2 } from '@nx/devkit';
import { PROJECT_FILE_PATTERN, PLUGIN_NAME } from '@/config';
import { createNodesFunction } from './createNodesFunction/createNodesFunction';
import { createDependencies } from './createDependencies/createDependencies';

const createNodes: CreateNodes = [PROJECT_FILE_PATTERN, createNodesFunction];

const nxPlugin: NxPluginV2 = {
    name: PLUGIN_NAME,
    createNodes,
    createDependencies,
};

export = nxPlugin;
