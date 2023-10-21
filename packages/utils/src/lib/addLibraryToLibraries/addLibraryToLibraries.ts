import type { Tree } from '@nx/devkit';
import { join } from 'path';
import { getPluginConfig } from '../getPluginConfig/getPluginConfig';
import { logger } from '../logger/logger';
import { updateFile } from '../updateFile/updateFileFile';

export const addLibraryToLibraries = (tree: Tree, libraryName: string) => {
    const { cmakeConfigDir } = getPluginConfig();
    const librariesFile = join(`${cmakeConfigDir}/libraries.cmake`);
    const libraryAddition = `list(APPEND LIBRARIES ${libraryName})`;
    const updatedLibraryFile = updateFile(tree, librariesFile, libraryAddition);
    logger(
        `Added library ${libraryName} to ${librariesFile}:`,
        ...updatedLibraryFile.split(`\n`),
    );
    return updatedLibraryFile;
};
