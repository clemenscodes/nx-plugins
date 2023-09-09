import type { NxJsonConfiguration } from '@nx/devkit';
import type { InitGeneratorSchema } from '../schema';

export const setWorkspaceLayout = (
    nxJson: NxJsonConfiguration,
    updatedNxJson: NxJsonConfiguration,
    options: InitGeneratorSchema
): [NxJsonConfiguration, InitGeneratorSchema] => {
    const { appsDir, libsDir } = options;

    if (!nxJson.workspaceLayout) {
        updatedNxJson.workspaceLayout = {
            appsDir,
            libsDir,
        };
        return [updatedNxJson, options];
    }

    options.appsDir = nxJson.workspaceLayout.appsDir;
    options.libsDir = nxJson.workspaceLayout.libsDir;

    return [updatedNxJson, options];
};
