import type { Tree } from '@nx/devkit';
import type { InitGeneratorSchema } from '@/types';
import { join } from 'path';
import { generateFiles } from '@nx/devkit';

export const generateRootConfig = (
    tree: Tree,
    options: InitGeneratorSchema,
) => {
    generateFiles(tree, join(__dirname, 'template'), '.', options);
};
