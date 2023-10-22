import type { NxJsonConfiguration } from '@nx/devkit';
import {
    InitGeneratorSchema,
    PluginConfig,
    PLUGIN_NAME,
    NxCmakePluginConfig,
} from '../../config';

export const writeConfig = (
    nxJson: NxJsonConfiguration,
    updatedNxJson: NxJsonConfiguration,
    options: InitGeneratorSchema,
): NxJsonConfiguration => {
    const { cmakeConfigDir, language, workspaceName } = options;
    const nxPluginConfig: PluginConfig = {
        [PLUGIN_NAME]: {
            language,
            cmakeConfigDir,
            workspaceName,
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

    const updatedPluginConfig = updatedNxJson.pluginsConfig[
        PLUGIN_NAME
    ] as NxCmakePluginConfig;

    if (!existingPluginConfig.cmakeConfigDir) {
        existingPluginConfig['cmakeConfigDir'] = cmakeConfigDir;
        updatedPluginConfig['cmakeConfigDir'] = cmakeConfigDir;
    }

    if (!existingPluginConfig.language) {
        existingPluginConfig['language'] = language;
        updatedPluginConfig['language'] = language;
    }

    if (!existingPluginConfig.workspaceName) {
        existingPluginConfig['workspaceName'] = workspaceName;
        updatedPluginConfig['workspaceName'] = workspaceName;
    }

    return updatedNxJson;
};
