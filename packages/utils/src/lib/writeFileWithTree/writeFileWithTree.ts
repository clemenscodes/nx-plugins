import { type Tree } from '@nx/devkit';
import { logger } from '@/log';
import { normalizeLineEndings } from '@/util';

export const writeFileWithTree = (
    tree: Tree,
    file: string,
    newContent: string,
) => {
    logger(`Writing file ${file} using tree`);
    tree.write(file, newContent);
    return normalizeLineEndings(newContent);
};
