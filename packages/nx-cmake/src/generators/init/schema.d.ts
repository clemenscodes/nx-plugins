import type { NxJsonConfiguration } from '@nx/devkit';

export interface InitGeneratorSchema {
    appsDir: string;
    libsDir: string;
    projectNameAndRootFormat: NxJsonConfiguration['workspaceLayout']['projectNameAndRootFormat'];
    cmakeConfigDir: string;
    addClangFormatPreset: boolean;
    skipFormat: boolean;
}
