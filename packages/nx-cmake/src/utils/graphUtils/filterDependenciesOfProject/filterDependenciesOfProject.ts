import {
    CreateDependenciesContext,
    NxJsonConfiguration,
    ProjectGraphDependencyWithFile,
    workspaceRoot,
} from '@nx/devkit';
import type {
    CTag,
    FilteredProject,
    WorkspaceLayout,
} from '../../../models/types';
import { filterGccDependencyOutput } from '../filterGccDependencyOutput/filterGccDependencyOutput';
import { getDependenciesOfProject } from '../getDependenciesOfProject/getDependenciesOfProject';
import { getExternalFiles } from '../getExternalFiles/getExternalFiles';
import { runCommand } from '../../runCommand/runCommand';
import { executeCommand } from '../../executeCommand/executeCommand';

export const getWorkspaceIncludeDir = () => 'include';

export const getGtestInclude = (workspaceLayout: WorkspaceLayout): string => {
    const { libsDir } = workspaceLayout;
    const gtestInclude = `dist/${libsDir}/gtest/googletest-src/googletest/include`;
    return gtestInclude;
};

export const getCmockaInclude = (workspaceLayout: WorkspaceLayout): string => {
    const { libsDir } = workspaceLayout;
    const cmockaInclude = `dist/${libsDir}/cmocka/cmocka-src/include`;
    return cmockaInclude;
};

export const getGccDependenciesCommand = (
    fileName: string,
    projectRoot: string,
    workspaceLayout: WorkspaceLayout
): string => {
    const { libsDir } = workspaceLayout;
    const includeDir = getWorkspaceIncludeDir();
    const gtestInclude = getGtestInclude(workspaceLayout);
    const cmockaInclude = getCmockaInclude(workspaceLayout);
    const cmd =
        `gcc -M ${fileName}` +
        ` -I ${projectRoot}/include` +
        ` -I ${libsDir}` +
        ` -I ${includeDir}` +
        ` -I ${gtestInclude}` +
        ` -I ${cmockaInclude}`;

    return cmd;
};

export const getFileName = (
    projectRoot: string,
    name: string,
    tag: CTag
): string => {
    const fileName = `${projectRoot}/src/${name}.${tag}`;
    return fileName;
};

export const messageIncludesGtest = (message: string) => {
    return message.includes('#include <gtest/gtest.h>');
};

export const messageIncludesCmocka = (message: string) => {
    return message.includes('#include <cmocka.h>');
};

export const detectTestFramework = (message: string) => {
    const includesGtest = messageIncludesGtest(message);
    const includesCmocka = messageIncludesCmocka(message);
    return includesGtest || includesCmocka;
};

export const installTestFramework = (
    workspaceRoot: string,
    projectRoot: string,
    cmd: string
) => {
    runCommand(
        'cmake',
        '-S',
        `${workspaceRoot}/${projectRoot}`,
        `${workspaceRoot}/dist/${projectRoot}`
    );

    const stdout = executeCommand(cmd);

    if (!stdout) {
        throw Error(`Failed process dependencies`);
    }

    return stdout;
};

export const getGccDependencies = (
    cmd: string,
    projectRoot: string,
    workspaceRoot: string
): string => {
    try {
        return executeCommand(cmd);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }
        const { message } = error;

        if (detectTestFramework(message)) {
            return installTestFramework(workspaceRoot, projectRoot, cmd);
        }

        throw error;
    }
};

export const filterDependenciesOfProject = (
    project: FilteredProject,
    workspaceLayout: NxJsonConfiguration['workspaceLayout'],
    ctx: CreateDependenciesContext,
    projects: FilteredProject[]
): ProjectGraphDependencyWithFile[] => {
    const { name, root, tag } = project;
    const fileName = getFileName(root, name, tag);
    const cmd = getGccDependenciesCommand(fileName, root, workspaceLayout);
    const stdout = getGccDependencies(cmd, root, workspaceRoot);
    const files = filterGccDependencyOutput(stdout);
    const externalFiles = getExternalFiles(files, root, tag);
    const dependencies = getDependenciesOfProject(
        name,
        externalFiles,
        ctx,
        projects
    );
    return dependencies;
};
