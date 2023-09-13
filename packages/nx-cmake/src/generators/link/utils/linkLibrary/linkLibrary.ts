import { type Tree } from '@nx/devkit';
import type { LinkSchema } from '../../schema';
import type { Link } from '../../../../models/types';
import { PROJECT_FILE } from '../../../../config/projectFilePattern';
import { trimLib } from '../../../../utils/generatorUtils/trimLib/trimLib';

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
    newContent: string
): string => {
    const updatedContent = `${oldContent}${newContent}`;
    return updatedContent;
};

export const readCmakeFile = (tree: Tree, cmakeFile: string): string => {
    const readCmakeFile = tree.read(cmakeFile, 'utf-8');
    return readCmakeFile;
};

export const writeCmakeFile = (
    tree: Tree,
    cmakeFile: string,
    newContent: string
): string => {
    tree.write(cmakeFile, newContent);
    return newContent;
};

export const linkLibrary = (tree: Tree, options: LinkSchema): string => {
    const { target, link, sourceProjectRoot } = options;
    const cmakeLink = getCmakeLink(link, target);
    const cmakeFile = getSourceCmakeFile(sourceProjectRoot);
    const cmakeFileContent = readCmakeFile(tree, cmakeFile);
    const updatedCmakeFileContent = getUpdatedCmakeFileContent(
        cmakeFileContent,
        cmakeLink
    );
    return writeCmakeFile(tree, cmakeFile, updatedCmakeFileContent);
};
