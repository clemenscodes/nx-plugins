import type { NxPluginV2 } from '@nx/devkit';
import { PLUGIN_NAME as name } from '@/config';
import { createNodes, createDependencies } from '@/graph';

const nxPlugin: NxPluginV2 = {
    name,
    createNodes,
    createDependencies,
};

export = nxPlugin;
