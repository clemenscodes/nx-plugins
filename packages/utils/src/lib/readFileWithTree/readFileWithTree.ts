import type { Tree } from '@nx/devkit';
import { normalizeLineEndings } from '../normalizeLineEndings/normalizeLineEndings';
import { logger } from '../logger/logger';

export const readFileWithTree = (tree: Tree, file: string): string => {
    logger(`Reading file ${file} using tree`);
    if (!tree.exists(file)) {
        throw new Error(`File ${file} does not exist`);
    }
    const fileContent = tree.read(file, 'utf-8');
    if (!fileContent) {
        throw new Error(`Failed to read file ${file}`);
    }
    return normalizeLineEndings(fileContent);
};
