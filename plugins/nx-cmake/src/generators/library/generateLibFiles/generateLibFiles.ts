import type { Tree } from '@nx/devkit';
import { generateFiles } from '@nx/devkit';
import { join } from 'path';
import { addLibraryToLibraries } from '../addLibraryToLibraries/addLibraryToLibraries';
import { LibSchema } from '../../generator';

export const generateLibFiles = (
    tree: Tree,
    resolvedLibOptions: LibSchema,
): void => {
    const { projectRoot, libName } = resolvedLibOptions;
    generateFiles(
        tree,
        join(__dirname, 'template'),
        projectRoot,
        resolvedLibOptions,
    );
    addLibraryToLibraries(tree, libName);
};
