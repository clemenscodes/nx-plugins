import {
    CreateDependenciesContext,
    NxJsonConfiguration,
    ProjectGraphDependencyWithFile,
    workspaceRoot,
} from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { execSync } from 'child_process';
import { filterOutput } from '../filterOutput/filterOutput';
import { getDependenciesOfProject } from '../getDependenciesOfProject/getDependenciesOfProject';
import { getExternalFiles } from '../getExternalFiles/getExternalFiles';
import { runCommand } from '../../runCommand/runCommand';

const getWorkspaceIncludeDir = () => 'include';

const configureTestFrameworks = (cmd: string, projectRoot: string): string => {
    const runCmd = (cmd: string) => {
        return execSync(cmd, {
            encoding: 'utf-8',
            stdio: ['inherit', 'pipe', 'pipe'],
        });
    };

    try {
        return runCmd(cmd);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        const { message } = error;
        const includesGtest = message.includes('#include <gtest/gtest.h>');
        const includesCmocka = message.includes('#include <cmocka.h>');

        if (includesGtest || includesCmocka) {
            runCommand(
                'cmake',
                '-S',
                `${workspaceRoot}/${projectRoot}`,
                `${workspaceRoot}/dist/${projectRoot}`
            );

            return runCmd(cmd);
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
    const { name, root: projectRoot, tag } = project;
    const fileName = `${projectRoot}/src/${name}.${tag}`;
    const includeDir = getWorkspaceIncludeDir();
    const { libsDir } = workspaceLayout;
    const gtestInclude = `dist/${libsDir}/gtest/googletest-src/googletest/include`;
    const cmockaInclude = `dist/${libsDir}/cmocka/cmocka-src/include`;
    const cmd = `gcc -M ${fileName} -I ${projectRoot}/include -I ${libsDir} -I ${includeDir} -I ${gtestInclude} -I ${cmockaInclude}`;
    const stdout = configureTestFrameworks(cmd, projectRoot);
    if (!stdout) {
        throw Error(`Failed process dependencies of project: ${project}`);
    }
    const files = filterOutput(stdout);
    const externalFiles = getExternalFiles(files, projectRoot, tag);
    const dependencies = getDependenciesOfProject(
        name,
        externalFiles,
        ctx,
        projects
    );
    return dependencies;
};
