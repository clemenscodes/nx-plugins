import type { NxCmakePluginConfig } from '../../../models/types';
import { getNxJsonConfiguration } from '../../generatorUtils/getNxJsonConfiguration/getNxJsonConfiguration';
import { PLUGIN_NAME } from '../../../config/pluginName';
import { assertIsPluginConfig } from '../assertIsPluginConfig/assertIsPluginConfig';

export const getPluginConfig = (): NxCmakePluginConfig => {
    const defaultPluginConfig: NxCmakePluginConfig = {
        language: 'C',
        cmakeConfigDir: '.cmake',
        globalIncludeDir: 'include',
    };
    const config = getNxJsonConfiguration();
    const pluginsConfig = config.pluginsConfig;
    if (!pluginsConfig) {
        return defaultPluginConfig;
    }
    if (!(PLUGIN_NAME in pluginsConfig)) {
        return defaultPluginConfig;
    }
    const pluginConfig = pluginsConfig[PLUGIN_NAME];
    try {
        assertIsPluginConfig(pluginConfig);
    } catch {
        return defaultPluginConfig;
    }
    return pluginConfig;
};
