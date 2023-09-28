import type { Tree } from '@nx/devkit';
import { generateFiles } from '@nx/devkit';
import { join } from 'path';

export const generateReadMe = (tree: Tree, name: string): void => {
    generateFiles(tree, join(__dirname, '../../', 'template'), '.', {
        name,
    });
};
