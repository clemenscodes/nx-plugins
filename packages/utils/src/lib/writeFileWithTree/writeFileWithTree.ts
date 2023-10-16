import { type Tree } from '@nx/devkit';
import { normalizeLineEndings } from '../normalizeLineEndings/normalizeLineEndings';
import { logger } from '../logger/logger';

export const writeFileWithTree = (
    tree: Tree,
    file: string,
    newContent: string,
) => {
    logger(`Writing file ${file} using tree`);
    tree.write(file, newContent);
    return normalizeLineEndings(newContent);
};
