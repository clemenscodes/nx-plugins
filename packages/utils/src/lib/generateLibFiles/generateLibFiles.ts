import type { Tree } from '@nx/devkit';
import type { LibOptions } from '@/types';
import { generateFiles } from '@nx/devkit';
import { join } from 'path';

export const generateLibFiles = (
    tree: Tree,
    resolvedLibOptions: LibOptions,
): void => {
    const { projectRoot } = resolvedLibOptions;
    generateFiles(
        tree,
        join(__dirname, 'template'),
        projectRoot,
        resolvedLibOptions,
    );
};
