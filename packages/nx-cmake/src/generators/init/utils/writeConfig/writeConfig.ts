import type { NxJsonConfiguration } from '@nx/devkit';
import type { InitGeneratorSchema } from '../../schema';
import type { PluginConfig } from '../../../../models/types';
import { PLUGIN_NAME } from '../../../../config/pluginName';
import { NxCmakePluginConfig } from '../../../../models/types';

export const writeConfig = (
    nxJson: NxJsonConfiguration,
    updatedNxJson: NxJsonConfiguration,
    options: InitGeneratorSchema,
): NxJsonConfiguration => {
    const { globalIncludeDir, cmakeConfigDir, language } = options;
    const nxPluginConfig: PluginConfig = {
        [PLUGIN_NAME]: {
            language,
            globalIncludeDir,
            cmakeConfigDir,
        },
    };

    if (!nxJson.pluginsConfig) {
        nxJson.pluginsConfig = nxPluginConfig;
        updatedNxJson.pluginsConfig = nxPluginConfig;
    }

    if (!(PLUGIN_NAME in nxJson.pluginsConfig)) {
        updatedNxJson.pluginsConfig = nxJson.pluginsConfig;
        updatedNxJson.pluginsConfig[PLUGIN_NAME] = nxPluginConfig[PLUGIN_NAME];
    }

    if (!updatedNxJson.pluginsConfig) {
        updatedNxJson.pluginsConfig = nxPluginConfig;
    }

    const existingPluginConfig = nxJson.pluginsConfig[
        PLUGIN_NAME
    ] as NxCmakePluginConfig;

    const updatedPluginConfig = updatedNxJson.pluginsConfig[PLUGIN_NAME];

    if (!existingPluginConfig.globalIncludeDir) {
        existingPluginConfig['globalIncludeDir'] = globalIncludeDir;
        updatedPluginConfig['globalIncludeDir'] = globalIncludeDir;
    }

    if (!existingPluginConfig.cmakeConfigDir) {
        existingPluginConfig['cmakeConfigDir'] = cmakeConfigDir;
        updatedPluginConfig['cmakeConfigDir'] = cmakeConfigDir;
    }

    if (!existingPluginConfig.language) {
        existingPluginConfig['langauge'] = language;
        updatedPluginConfig['language'] = language;
    }

    return updatedNxJson;
};