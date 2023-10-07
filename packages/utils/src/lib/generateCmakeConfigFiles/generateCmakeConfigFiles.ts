import type { Tree } from '@nx/devkit';
import type { InitGeneratorSchema } from '@/config';
import { generateFiles } from '@nx/devkit';
import { join } from 'path';

export const generateCmakeConfigFiles = (
    tree: Tree,
    options: InitGeneratorSchema,
) => {
    const { cmakeConfigDir } = options;
    generateFiles(tree, join(__dirname, 'template'), cmakeConfigDir, options);
};
