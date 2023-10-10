import type { LibSchema } from '@/config';
import type { Tree } from '@nx/devkit';
import { generateFiles } from '@nx/devkit';
import { join } from 'path';

export const generateLibFiles = (
    tree: Tree,
    resolvedLibOptions: LibSchema,
): void => {
    const { projectRoot } = resolvedLibOptions;
    generateFiles(
        tree,
        join(__dirname, 'template'),
        projectRoot,
        resolvedLibOptions,
    );
};
