import type { Tree } from '@nx/devkit';

export const writeFileWithTree = (
    tree: Tree,
    file: string,
    newContent: string,
) => {
    tree.write(file, newContent);
    return newContent;
};
