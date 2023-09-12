import { Tree, generateFiles } from '@nx/devkit';
import { join } from 'path';
import { BinSchema } from '../../schema';

export const generateBinFiles = (tree: Tree, options: BinSchema) => {
    const { projectRoot } = options;
    generateFiles(
        tree,
        join(__dirname, '../../', 'template'),
        projectRoot,
        options
    );
};
