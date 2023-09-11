import type { NxJsonConfiguration } from '@nx/devkit';
import type { InitGeneratorSchema } from '../../schema';

export const setWorkspaceLayout = (
    nxJson: NxJsonConfiguration,
    updatedNxJson: NxJsonConfiguration,
    options: InitGeneratorSchema
): [NxJsonConfiguration, InitGeneratorSchema] => {
    const { appsDir, libsDir, projectNameAndRootFormat } = options;

    if (!updatedNxJson.workspaceLayout) {
        updatedNxJson.workspaceLayout = {
            appsDir,
            libsDir,
            projectNameAndRootFormat,
        };
    }

    if (!nxJson.workspaceLayout) {
        updatedNxJson.workspaceLayout = {
            appsDir,
            libsDir,
            projectNameAndRootFormat,
        };
        return [updatedNxJson, options];
    }

    if (!nxJson.workspaceLayout.appsDir) {
        updatedNxJson.workspaceLayout.appsDir = options.appsDir;
    }

    if (!nxJson.workspaceLayout.libsDir) {
        updatedNxJson.workspaceLayout.libsDir = options.libsDir;
    }

    if (!nxJson.workspaceLayout.projectNameAndRootFormat) {
        updatedNxJson.workspaceLayout.projectNameAndRootFormat =
            options.projectNameAndRootFormat;
    }

    if (nxJson.workspaceLayout.appsDir) {
        options.appsDir = nxJson.workspaceLayout.appsDir;
        updatedNxJson.workspaceLayout.appsDir = options.appsDir;
    }

    if (nxJson.workspaceLayout.libsDir) {
        options.libsDir = nxJson.workspaceLayout.libsDir;
        updatedNxJson.workspaceLayout.libsDir = options.libsDir;
    }

    if (nxJson.workspaceLayout.projectNameAndRootFormat) {
        options.projectNameAndRootFormat =
            nxJson.workspaceLayout.projectNameAndRootFormat;
        updatedNxJson.workspaceLayout.projectNameAndRootFormat =
            options.projectNameAndRootFormat;
    }

    return [updatedNxJson, options];
};
