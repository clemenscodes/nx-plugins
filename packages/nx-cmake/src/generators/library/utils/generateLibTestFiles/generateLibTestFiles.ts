import type { LibOptions } from '../../schema';
import type { Tree } from '@nx/devkit';
import { generateFiles } from '@nx/devkit';
import { join } from 'path';
import { getWorkspaceLayout } from '../../../../utils/generatorUtils/getWorkspaceLayout/getWorkspaceLayout';

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
        join(__dirname, '../../', 'template', 'test'),
        `${appsDir}/${testName}`,
        resolvedLibOptions,
    );
};
