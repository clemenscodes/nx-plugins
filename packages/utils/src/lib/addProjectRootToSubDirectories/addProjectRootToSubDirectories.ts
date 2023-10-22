import { type Tree } from '@nx/devkit';
import { join } from 'path';
import { getPluginConfig } from '../getPluginConfig/getPluginConfig';
import { updateFile } from '../updateFile/updateFileFile';
import { logger } from '@/log';

export const addProjectRootToSubDirectories = (
    tree: Tree,
    projectRoot: string,
) => {
    const { cmakeConfigDir } = getPluginConfig();
    const subDirectoriesFile = join(`${cmakeConfigDir}/subdirectories.cmake`);
    const subDirectoryAddition = `list(APPEND SUB_DIRECTORIES ${projectRoot})`;
    const updatedSubDirectoriesFile = updateFile(
        tree,
        subDirectoriesFile,
        subDirectoryAddition,
    );
    logger(
        `Added project ${projectRoot} to ${subDirectoriesFile}:`,
        ...updatedSubDirectoriesFile.split(`\n`),
    );
    return updatedSubDirectoriesFile;
};
