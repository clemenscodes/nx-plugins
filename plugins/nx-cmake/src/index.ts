import type { NxPluginV2 } from '@nx/devkit';
import { PLUGIN_NAME as name } from './config/name';
import { createDependencies } from './graph/createDependencies/createDependencies';
import { createNodes } from './graph/createNodes/createNodes';

export default {
    name,
    createNodes,
    createDependencies,
} satisfies NxPluginV2
