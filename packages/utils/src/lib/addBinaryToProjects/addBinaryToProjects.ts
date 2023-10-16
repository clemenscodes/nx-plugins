import type { Tree } from '@nx/devkit';
import { getPluginConfig } from '../getPluginConfig/getPluginConfig';
import { logger } from '../logger/logger';
import { updateFile } from '../updateFile/updateFileFile';

export const addBinaryToProjects = (tree: Tree, name: string): string => {
    const { cmakeConfigDir } = getPluginConfig();
    const projectsFile = `${cmakeConfigDir}/settings/projects.cmake`;
    const projectAddition = `list(APPEND PROJECTS ${name})`;
    const updatedProjectsFile = updateFile(tree, projectsFile, projectAddition);
    logger(
        `Added project ${name} to ${projectsFile}:`,
        ...updatedProjectsFile.split(`\n`),
    );
    return updatedProjectsFile;
};
