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
import { execSync } from 'child_process';
import { filterOutput } from '../filterOutput/filterOutput';
import { getDependenciesOfProject } from '../getDependenciesOfProject/getDependenciesOfProject';
import { getExternalFiles } from '../getExternalFiles/getExternalFiles';
import { runCommand } from '../../runCommand/runCommand';

export const getWorkspaceIncludeDir = () => 'include';

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

export const executeCommand = (cmd: string) => {
    return execSync(cmd, {
        encoding: 'utf-8',
        stdio: ['inherit', 'pipe', 'pipe'],
    });
};

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

export const getFilterCommand = (
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

export const filterDependenciesOfProject = (
    project: FilteredProject,
    workspaceLayout: NxJsonConfiguration['workspaceLayout'],
    ctx: CreateDependenciesContext,
    projects: FilteredProject[]
): ProjectGraphDependencyWithFile[] => {
    const { name, root, tag } = project;
    const fileName = getFileName(root, name, tag);
    const cmd = getFilterCommand(fileName, root, workspaceLayout);

    try {
        const stdout = executeCommand(cmd);

        const files = filterOutput(stdout);
        const externalFiles = getExternalFiles(files, root, tag);
        const dependencies = getDependenciesOfProject(
            name,
            externalFiles,
            ctx,
            projects
        );
        return dependencies;
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        if (detectTestFramework(error.message)) {
            runCommand(
                'cmake',
                '-S',
                `${workspaceRoot}/${root}`,
                `${workspaceRoot}/dist/${root}`
            );

            const stdout = executeCommand(cmd);

            if (!stdout) {
                throw Error(`Failed to process dependencies`);
            }

            const files = filterOutput(stdout);
            const externalFiles = getExternalFiles(files, root, tag);
            const dependencies = getDependenciesOfProject(
                name,
                externalFiles,
                ctx,
                projects
            );
            return dependencies;
        }

        throw error;
    }
};
