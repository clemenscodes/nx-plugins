import type { NxJsonConfiguration } from '@nx/devkit';
import { PLUGIN_NAME } from '../../../../config/pluginName';

export const addCmakePlugin = (
    updatedNxJson: NxJsonConfiguration,
): NxJsonConfiguration => {
    const { plugins } = updatedNxJson;

    if (plugins && !plugins.includes(PLUGIN_NAME)) {
        updatedNxJson.plugins.push(PLUGIN_NAME);
        return updatedNxJson;
    }

    updatedNxJson.plugins = [PLUGIN_NAME];
    return updatedNxJson;
};
