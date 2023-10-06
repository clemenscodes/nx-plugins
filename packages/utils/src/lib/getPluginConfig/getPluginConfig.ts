import type { NxCmakePluginConfig } from '@/types';
import { PLUGIN_NAME } from '@/config';
import { assertIsPluginConfig } from '../assertIsPluginConfig/assertIsPluginConfig';
import { getNxJsonConfiguration } from '../getNxJsonConfiguration/getNxJsonConfiguration';

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
