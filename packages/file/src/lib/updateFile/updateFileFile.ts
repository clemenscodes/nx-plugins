import { type Tree } from '@nx/devkit';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';
import { writeFileWithTree } from '../writeFileWithTree/writeFileWithTree';

export const appendLines = (appendTo: string, whatToAppend: string): string => {
    const result = [appendTo, whatToAppend].join('\n');
    return result;
};

export const updateFile = (
    tree: Tree,
    file: string,
    content: string,
): string => {
    const readContent = readFileWithTree(tree, file);
    const newContent = appendLines(readContent, content);
    const updatedContent = writeFileWithTree(tree, file, newContent);
    return updatedContent;
};
