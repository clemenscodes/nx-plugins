import type { Tree } from '@nx/devkit';
import { join } from 'path';
import { updateFile, writeFileWithTree } from '@/file';
import { LinkSchema } from '../../generator';

export const getFindDependencyStatements = (
    target: string,
    targetProjectRoot: string,
): string => {
    const findDependencyStatements =
        `list(APPEND CMAKE_PREFIX_PATH \${ROOT}/dist/${targetProjectRoot})\n` +
        `find_dependency(${target})\n`;
    return findDependencyStatements;
};

export const getCmakeConfigInFile = (
    source: string,
    sourceProjectRoot: string,
): string => {
    const cmakeConfigInFile = join(
        sourceProjectRoot,
        'cmake',
        `${source}Config.cmake.in`,
    );
    return cmakeConfigInFile;
};

export const updateCmakeConfigInFile = (tree: Tree, options: LinkSchema) => {
    const { source, target, sourceProjectRoot, targetProjectRoot } = options;
    const findDependencyStatements = getFindDependencyStatements(
        target,
        targetProjectRoot,
    );
    const cmakeConfigInFile = getCmakeConfigInFile(source, sourceProjectRoot);
    const updatedCmakeConfigInFileContent = updateFile(
        tree,
        cmakeConfigInFile,
        findDependencyStatements,
    );
    return writeFileWithTree(
        tree,
        cmakeConfigInFile,
        updatedCmakeConfigInFileContent,
    );
};
