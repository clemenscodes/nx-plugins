import { type Tree } from '@nx/devkit';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';
import { PROJECT_FILE } from '@/config';
import { writeFileWithTree } from '../writeFileWithTree/writeFileWithTree';

export const appendLines = (appendTo: string, whatToAppend: string): string => {
    const result = [appendTo, whatToAppend].join('\n');
    return result;
};

export const updateRootCmakeFile = (tree: Tree, content: string) => {
    const rootCmakeFile = PROJECT_FILE;
    const readContent = readFileWithTree(tree, rootCmakeFile);
    const newContent = appendLines(readContent, content);
    const updatedContent = writeFileWithTree(tree, rootCmakeFile, newContent);
    return updatedContent;
};
