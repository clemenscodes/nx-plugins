import { getNxJsonConfiguration } from '@/util';
import {
    NxCmakePluginConfig,
    PLUGIN_NAME,
    assertIsPluginConfig,
} from '../../config';

export const getPluginConfig = (): NxCmakePluginConfig => {
    const defaultPluginConfig: NxCmakePluginConfig = {
        language: 'C',
        cmakeConfigDir: '.cmake',
        workspaceName: 'workspace',
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
