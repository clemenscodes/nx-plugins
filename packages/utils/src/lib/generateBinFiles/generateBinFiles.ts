import type { Tree } from '@nx/devkit';
import type { BinSchema } from '@/config';
import { generateFiles } from '@nx/devkit';
import { join } from 'path';

export const generateBinFiles = (tree: Tree, options: BinSchema) => {
    const { projectRoot } = options;
    generateFiles(tree, join(__dirname, 'template'), projectRoot, options);
};
