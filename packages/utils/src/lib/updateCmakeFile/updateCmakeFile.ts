import type { Tree } from '@nx/devkit';
import type { LinkSchema, Link } from '@/types';
import { PROJECT_FILE } from '@/config';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';
import { trimLib } from '../trimLib/trimLib';
import { writeFileWithTree } from '../writeFileWithTree/writeFileWithTree';

export const getCmakeLink = (link: Link, target: string): string => {
    const trimmedTarget = trimLib(target);
    const cmakeLink = `link_${link}_library(\${CMAKE_PROJECT_NAME} ${trimmedTarget})\n`;
    return cmakeLink;
};

export const getSourceCmakeFile = (sourceProjectRoot: string): string => {
    const cmakeFile = `${sourceProjectRoot}/${PROJECT_FILE}`;
    return cmakeFile;
};

export const getUpdatedCmakeFileContent = (
    oldContent: string,
    newContent: string,
): string => {
    if (oldContent.includes(newContent)) {
        return oldContent;
    }
    const updatedContent = `${oldContent}${newContent}`;
    return updatedContent;
};

export const updateCmakeFile = (tree: Tree, options: LinkSchema) => {
    const { target, link, sourceProjectRoot } = options;
    const cmakeLink = getCmakeLink(link, target);
    const cmakeFile = getSourceCmakeFile(sourceProjectRoot);
    const cmakeFileContent = readFileWithTree(tree, cmakeFile);
    const updatedCmakeFileContent = getUpdatedCmakeFileContent(
        cmakeFileContent,
        cmakeLink,
    );
    return writeFileWithTree(tree, cmakeFile, updatedCmakeFileContent);
};
