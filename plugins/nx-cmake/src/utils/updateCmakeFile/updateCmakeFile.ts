import type { Tree } from '@nx/devkit';
import { join } from 'path';
import { trimLib, updateFile, writeFileWithTree } from '@/util';
import { PROJECT_FILE } from '../../config';
import { LinkSchema } from '../../generators/generator';

export const getCmakeLink = (target: string): string => {
    const trimmedTarget = trimLib(target);
    const cmakeLink = `link_library(\${CMAKE_PROJECT_NAME} ${trimmedTarget})\n`;
    return cmakeLink;
};

export const getSourceCmakeFile = (sourceProjectRoot: string): string => {
    const cmakeFile = join(`${sourceProjectRoot}/${PROJECT_FILE}`);
    return cmakeFile;
};

export const updateCmakeFile = (tree: Tree, options: LinkSchema) => {
    const { target, sourceProjectRoot } = options;
    const cmakeLink = getCmakeLink(target);
    const cmakeFile = getSourceCmakeFile(sourceProjectRoot);
    const updatedCmakeFileContent = updateFile(tree, cmakeFile, cmakeLink);
    return writeFileWithTree(tree, cmakeFile, updatedCmakeFileContent);
};
