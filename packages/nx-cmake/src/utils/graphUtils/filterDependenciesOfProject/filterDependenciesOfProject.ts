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

const getWorkspaceIncludeDir = () => {
    return 'include';
};

export const filterDependenciesOfProject = async (
    project: FilteredProject,
    workspaceLayout: NxJsonConfiguration['workspaceLayout'],
    ctx: CreateDependenciesContext,
    projects: FilteredProject[]
): Promise<ProjectGraphDependencyWithFile[]> => {
    const { name, root: projectRoot, tag } = project;
    const fileName = `${projectRoot}/src/${name}.${tag}`;
    const includeDir = getWorkspaceIncludeDir();
    const { libsDir } = workspaceLayout;
    const gtestInclude = `dist/${libsDir}/gtest/googletest-src/googletest/include`;
    const cmockaInclude = `dist/${libsDir}/cmocka/cmocka-src/include`;
    const cmd = `gcc -M ${fileName} -I ${projectRoot}/include -I ${libsDir} -I ${includeDir} -I ${gtestInclude} -I ${cmockaInclude}`;
    let output: string;
    try {
        output = execSync(cmd, {
            encoding: 'utf-8',
            stdio: ['inherit', 'pipe', 'pipe'],
        });
    } catch (e) {
        if (!(e instanceof Error)) {
            console.error('An unexpected error happened');
            throw e;
        }
        const { message } = e;
        if (!message.includes('Command failed: gcc')) {
            console.error('An unexpected error happened');
            throw e;
        }
        if (
            message.includes('#include <gtest/gtest.h>') ||
            message.includes('#include <cmocka.h>')
        ) {
            runCommand(
                'cmake',
                '-S',
                `${workspaceRoot}/${projectRoot}`,
                `${workspaceRoot}/dist/${projectRoot}`
            );
            output = execSync(cmd, {
                encoding: 'utf-8',
                stdio: ['inherit', 'pipe', 'pipe'],
            });
        } else {
            throw e;
        }
    }
    if (!output) {
        throw Error(`Failed process dependencies of project: ${project}`);
    }
    const files = filterOutput(output);
    const externalFiles = getExternalFiles(files, projectRoot, tag);
    const dependencies = getDependenciesOfProject(
        name,
        externalFiles,
        ctx,
        projects
    );
    return dependencies;
};
