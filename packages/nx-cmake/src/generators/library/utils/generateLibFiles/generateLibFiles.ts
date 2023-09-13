import { Tree, generateFiles } from '@nx/devkit';
import { join } from 'path';
import { LibOptions } from '../../schema';

export const generateLibFiles = (
    tree: Tree,
    resolvedLibOptions: LibOptions
): void => {
    const { projectRoot } = resolvedLibOptions;
    generateFiles(
        tree,
        join(__dirname, '../../', 'template', 'config'),
        projectRoot,
        resolvedLibOptions
    );
};
