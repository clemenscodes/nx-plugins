import type { NxJsonConfiguration } from '@nx/devkit';
import type { InitGeneratorSchema } from '@/config';

export const setWorkspaceLayout = (
    nxJson: NxJsonConfiguration,
    updatedNxJson: NxJsonConfiguration,
    options: InitGeneratorSchema,
): [NxJsonConfiguration, InitGeneratorSchema] => {
    const { appsDir, libsDir } = options;

    if (!updatedNxJson.workspaceLayout) {
        updatedNxJson.workspaceLayout = {
            appsDir,
            libsDir,
        };
    }

    if (!nxJson.workspaceLayout) {
        updatedNxJson.workspaceLayout = {
            appsDir,
            libsDir,
        };
        return [updatedNxJson, options];
    }

    if (!nxJson.workspaceLayout.appsDir) {
        updatedNxJson.workspaceLayout.appsDir = options.appsDir;
    }

    if (!nxJson.workspaceLayout.libsDir) {
        updatedNxJson.workspaceLayout.libsDir = options.libsDir;
    }

    if (nxJson.workspaceLayout.appsDir) {
        options.appsDir = nxJson.workspaceLayout.appsDir;
        updatedNxJson.workspaceLayout.appsDir = options.appsDir;
    }

    if (nxJson.workspaceLayout.libsDir) {
        options.libsDir = nxJson.workspaceLayout.libsDir;
        updatedNxJson.workspaceLayout.libsDir = options.libsDir;
    }

    return [updatedNxJson, options];
};
