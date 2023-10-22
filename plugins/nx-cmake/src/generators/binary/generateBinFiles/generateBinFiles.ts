import type { Tree } from '@nx/devkit';
import { generateFiles } from '@nx/devkit';
import { join } from 'path';
import { BinSchema } from '../../generator';

export const generateBinFiles = (tree: Tree, options: BinSchema) => {
    const { projectRoot } = options;
    generateFiles(tree, join(__dirname, 'template'), projectRoot, options);
};
