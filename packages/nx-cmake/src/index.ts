import { type NxPluginV2 } from '@nx/devkit';
import { PLUGIN_NAME } from './config/pluginName';
import { createNodes } from './utils/graphUtils/createNodes/createNodes';
import { createDependencies } from './utils/graphUtils/createDependencies/createDependencies';

const nxPlugin: NxPluginV2 = {
    name: PLUGIN_NAME,
    createNodes,
    createDependencies,
};

export = nxPlugin;
