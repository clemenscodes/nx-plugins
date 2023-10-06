import type { Tree } from '@nx/devkit';
import { normalizeLineEndings } from '../normalizeLineEndings/normalizeLineEndings';

export const readFileWithTree = (tree: Tree, file: string): string => {
    const fileContent = tree.read(file, 'utf-8');
    if (!fileContent) {
        throw new Error(`Failed to read file ${file}`);
    }
    return normalizeLineEndings(fileContent);
};
