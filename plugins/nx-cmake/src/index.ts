import type { NxPluginV2 } from '@nx/devkit';
import { PLUGIN_NAME as name } from './config/name';
import { createDependencies } from './graph/createDependencies/createDependencies';
import { createNodes } from './graph/createNodes/createNodes';

const nxPlugin: NxPluginV2 = {
    name,
    createDependencies,
    createNodes,
};

export = nxPlugin;
