import { type Tree } from '@nx/devkit';
import type { LinkSchema } from '../../schema';
import type { Link } from '../../../../models/types';
import { PROJECT_FILE } from '../../../../config/projectFilePattern';

export const getCmakeLink = (link: Link, target: string): string => {
    const cmakeLink = `link_${link}_library(\${CMAKE_PROJECT_NAME} ${target})\n`;
    return cmakeLink;
};

export const getSourceCmakeFile = (sourceProjectRoot: string): string => {
    const cmakeFile = `${sourceProjectRoot}/${PROJECT_FILE}`;
    return cmakeFile;
};

export const readCmakeFile = (tree: Tree, cmakeFile: string): string => {
    const readCmakeFile = tree.read(cmakeFile, 'utf-8');
    return readCmakeFile;
};

export const getUpdatedCmakeFileContent = (
    oldContent: string,
    newContent: string
): string => {
    const updatedContent = `${oldContent}${newContent}`;
    return updatedContent;
};

export const writeCmakeFile = (
    tree: Tree,
    cmakeFile: string,
    newContent: string
): void => {
    tree.write(cmakeFile, newContent);
};

export const linkLibrary = (tree: Tree, options: LinkSchema) => {
    const { target, link, sourceProjectRoot } = options;
    const cmakeLink = getCmakeLink(link, target);
    const cmakeFile = getSourceCmakeFile(sourceProjectRoot);
    const cmakeFileContent = readCmakeFile(tree, cmakeFile);
    const updatedCmakeFileContent = getUpdatedCmakeFileContent(
        cmakeFileContent,
        cmakeLink
    );
    writeCmakeFile(tree, cmakeFile, updatedCmakeFileContent);
};
