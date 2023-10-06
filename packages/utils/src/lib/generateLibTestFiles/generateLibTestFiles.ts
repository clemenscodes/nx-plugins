import type { LibOptions } from '@/types';
import type { Tree } from '@nx/devkit';
import { generateFiles } from '@nx/devkit';
import { join } from 'path';
import { getWorkspaceLayout } from '../getWorkspaceLayout/getWorkspaceLayout';

export const generateLibTestFiles = (
    tree: Tree,
    resolvedLibOptions: LibOptions,
): void => {
    if (!resolvedLibOptions.generateTests) {
        return;
    }
    const { appsDir } = getWorkspaceLayout();
    const { testName } = resolvedLibOptions;
    generateFiles(
        tree,
        join(__dirname, 'template'),
        `${appsDir}/${testName}`,
        resolvedLibOptions,
    );
};
