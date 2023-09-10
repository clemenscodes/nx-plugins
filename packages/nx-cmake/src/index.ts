import { type NxPluginV2 } from '@nx/devkit';
import { PLUGIN_NAME } from './config/pluginName';
import { createDependencies } from './utils/createDependencies/createDependencies';
import { createNodes } from './utils/createNodes/createNodes';

const nxPlugin: NxPluginV2 = {
    name: PLUGIN_NAME,
    createNodes,
    createDependencies,
};

export = nxPlugin;
