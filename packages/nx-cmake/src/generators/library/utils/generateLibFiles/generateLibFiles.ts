import { Tree, generateFiles } from '@nx/devkit';
import { join } from 'path';
import { LibOptions } from '../../schema';

export const generateLibFiles = (
    tree: Tree,
    resolvedLibOptions: LibOptions
) => {
    const { generateTests, projectRoot } = resolvedLibOptions;
    generateFiles(
        tree,
        join(
            __dirname,
            '../../',
            'template',
            generateTests ? 'test' : 'config'
        ),
        projectRoot,
        resolvedLibOptions
    );
};
