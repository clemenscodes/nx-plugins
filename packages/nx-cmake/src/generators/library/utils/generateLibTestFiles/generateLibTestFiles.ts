import { Tree, generateFiles } from '@nx/devkit';
import { join } from 'path';
import { LibOptions } from '../../schema';

export const generateLibTestFiles = (
    tree: Tree,
    resolvedLibOptions: LibOptions
): void => {
    if (!resolvedLibOptions.generateTests) {
        return;
    }
    const { projectRoot } = resolvedLibOptions;
    generateFiles(
        tree,
        join(__dirname, '../../', 'template', 'test'),
        `${projectRoot}/test`,
        resolvedLibOptions
    );
};
