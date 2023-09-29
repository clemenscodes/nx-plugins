import type { Tree } from '@nx/devkit';
import { normalizeLineEndings } from '../../testUtils/normalizeLineEndings/normalizeLineEndings';

export const readFileWithTree = (tree: Tree, file: string): string => {
    const fileContent = tree.read(file, 'utf-8');
    return normalizeLineEndings(fileContent);
};
