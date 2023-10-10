import type { Tree } from '@nx/devkit';
import { normalizeLineEndings } from '../normalizeLineEndings/normalizeLineEndings';

export const writeFileWithTree = (
    tree: Tree,
    file: string,
    newContent: string,
) => {
    tree.write(file, newContent);
    return normalizeLineEndings(newContent);
};
