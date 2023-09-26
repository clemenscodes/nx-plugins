import { getPluginConfig } from '../getPluginConfig/getPluginConfig';
import { NxCmakePluginConfig } from '../../../models/types';

export const getWorkspaceIncludeDir =
    (): NxCmakePluginConfig['globalIncludeDir'] => {
        const pluginConfig = getPluginConfig();
        const { globalIncludeDir } = pluginConfig;
        return globalIncludeDir;
    };
