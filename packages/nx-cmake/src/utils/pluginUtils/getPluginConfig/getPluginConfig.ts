import type { NxCmakePluginConfig } from '../../../models/types';
import { getNxJsonConfiguration } from '../../generatorUtils/getNxJsonConfiguration/getNxJsonConfiguration';
import { PLUGIN_NAME } from '../../../config/pluginName';
import { assertIsPluginConfig } from '../assertIsPluginConfig/assertIsPluginConfig';

export const getPluginConfig = (): NxCmakePluginConfig => {
    const config = getNxJsonConfiguration();
    const pluginsConfig = config.pluginsConfig;
    if (!pluginsConfig) {
        throw new Error('Failed to read pluginsConfig of nx.json');
    }
    if (!(PLUGIN_NAME in pluginsConfig)) {
        throw new Error(
            `Failed to read ${PLUGIN_NAME} field in pluginsConfig of nx.json`,
        );
    }
    const pluginConfig = pluginsConfig[PLUGIN_NAME];
    assertIsPluginConfig(pluginConfig);
    return pluginConfig;
};
