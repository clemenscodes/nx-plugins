import type { Tree } from '@nx/devkit';
import { generateFiles } from '@nx/devkit';
import { join } from 'path';
import { InitGeneratorSchema } from '../../config';

export const generateCmakeConfigFiles = (
    tree: Tree,
    options: InitGeneratorSchema,
) => {
    const { cmakeConfigDir } = options;
    generateFiles(tree, join(__dirname, 'template'), cmakeConfigDir, options);
};
