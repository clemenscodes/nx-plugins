import type { Tree } from '@nx/devkit';
import { generateFiles } from '@nx/devkit';
import { join } from 'path';
import { getWorkspaceLayout } from '../getWorkspaceLayout/getWorkspaceLayout';
import { LibSchema } from '@/config';

export const generateLibTestFiles = (
    tree: Tree,
    resolvedLibOptions: LibSchema,
): void => {
    if (!resolvedLibOptions.generateTests) {
        return;
    }
    const { appsDir } = getWorkspaceLayout();
    const { testName } = resolvedLibOptions;
    const testDir = `${appsDir}/${testName}`;
    generateFiles(
        tree,
        join(__dirname, 'template'),
        testDir,
        resolvedLibOptions,
    );
};
