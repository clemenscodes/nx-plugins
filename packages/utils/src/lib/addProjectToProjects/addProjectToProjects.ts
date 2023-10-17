import type { Tree } from '@nx/devkit';
import { getPluginConfig } from '../getPluginConfig/getPluginConfig';
import { logger } from '../logger/logger';
import { updateFile } from '../updateFile/updateFileFile';
import { join } from 'path';

export const addProjectToProjects = (
    tree: Tree,
    projectName: string,
    projectRoot: string,
): string => {
    const { cmakeConfigDir } = getPluginConfig();
    const projectsFile = join(`${cmakeConfigDir}/settings/projects.cmake`);
    const projectAddition = `list(APPEND PROJECTS ${projectRoot})`;
    const updatedProjectsFile = updateFile(tree, projectsFile, projectAddition);
    logger(
        `Added project ${projectName} to ${projectsFile}:`,
        ...updatedProjectsFile.split(`\n`),
    );
    return updatedProjectsFile;
};
