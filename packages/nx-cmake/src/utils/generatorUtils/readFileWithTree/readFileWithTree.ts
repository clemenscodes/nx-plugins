import type { Tree } from '@nx/devkit';

export const readFileWithTree = (tree: Tree, file: string): string => {
    const fileContent = tree.read(file, 'utf-8');
    return fileContent;
};
