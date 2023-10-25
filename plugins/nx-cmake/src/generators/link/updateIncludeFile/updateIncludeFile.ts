import type { Tree } from '@nx/devkit';
import { names } from '@nx/devkit';
import { trimLib, trimTest } from '@/util';
import { readFileWithTree, writeFileWithTree } from '@/file';
import { LinkSchema } from '../../generator';

export const getIncludeDirective = (project: string): string => {
    const includeDirective = `#include "${project}.h"`;
    return includeDirective;
};

export const getIncludeFile = (
    project: string,
    sourceProjectRoot: string,
): string => {
    const includeFile = `${sourceProjectRoot}/include/${project}.h`;
    return includeFile;
};

export const getProjectMacroDefinition = (project: string): string => {
    const trimmedLibProjectName = trimLib(project);
    const trimmedProjectName = trimTest(trimmedLibProjectName);
    const { constantName } = names(project);
    const { constantName: trimmedConstantName } = names(trimmedProjectName);
    const projectMacroDefinition = `_${constantName}_${trimmedConstantName}`;
    const macroDefinition = `#ifndef ${projectMacroDefinition}\n#define ${projectMacroDefinition}\n`;
    return macroDefinition;
};

export const getUpdatedIncludeFileContent = (
    tree: Tree,
    includeFile: string,
    macroDefinition: string,
    includeDirective: string,
): string => {
    const includeFileContent = readFileWithTree(tree, includeFile);
    if (includeFileContent.includes(includeDirective)) {
        return includeFileContent;
    }
    const [start, appendBeforeThis] = includeFileContent.split(macroDefinition);
    const updatedIncludeFileContent = [
        ...(start ? [start] : [macroDefinition]),
        includeDirective,
        ...(appendBeforeThis ? [appendBeforeThis] : []),
    ].join('\n');
    return updatedIncludeFileContent;
};

export const updateIncludeFile = (tree: Tree, options: LinkSchema): string => {
    const { source, target, sourceProjectRoot } = options;
    const includeDirective = getIncludeDirective(target);
    const includeFile = getIncludeFile(source, sourceProjectRoot);
    const macroDefinition = getProjectMacroDefinition(source);
    const updatedIncludeFileContent = getUpdatedIncludeFileContent(
        tree,
        includeFile,
        macroDefinition,
        includeDirective,
    );
    return writeFileWithTree(tree, includeFile, updatedIncludeFileContent);
};
