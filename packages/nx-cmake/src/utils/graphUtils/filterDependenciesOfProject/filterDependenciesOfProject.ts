import type { FileData, ProjectGraphDependencyWithFile } from '@nx/devkit';
import type { FilteredProject, WorkspaceLayout } from '../../../models/types';
import { workspaceRoot } from '@nx/devkit';
import { filterGccDependencyOutput } from '../filterGccDependencyOutput/filterGccDependencyOutput';
import { getDependenciesOfFile } from '../getDependenciesOfFile/getDependenciesOfFile';
import { getGccDependencies } from './getGccDependencies/getGccDependencies';
import { getGccDependenciesCommand } from './getGccDependenciesCommand/getGccDependenciesCommand';
import { isValidProjectFile } from '../getDependenciesOfFile/isvalidProjectFile/isValidProjectFile';

export const filterDependenciesOfProject = (
    project: FilteredProject,
    workspaceLayout: WorkspaceLayout,
    projects: FilteredProject[],
    filesToProcess: FileData[]
): ProjectGraphDependencyWithFile[] => {
    const { root, tag } = project;
    const projectDependencies: ProjectGraphDependencyWithFile[] = [];
    const filteredFilesToProcess = filesToProcess.filter((fileData) => {
        const { file } = fileData;
        const isSourceFile = isValidProjectFile(file, tag);
        return isSourceFile;
    });

    for (const fileData of filteredFilesToProcess) {
        const { file } = fileData;
        const cmd = getGccDependenciesCommand(file, root, workspaceLayout, tag);
        const stdout = getGccDependencies(cmd, root, workspaceRoot);
        const files = filterGccDependencyOutput(stdout, file);
        const fileDependencies = getDependenciesOfFile(
            project,
            file,
            files,
            projects
        );
        projectDependencies.push(...fileDependencies);
    }

    // console.log({
    //     project,
    //     workspaceLayout,
    //     projects,
    //     filesToProcess: JSON.stringify(filesToProcess),
    //     projectDependencies,
    // });
    return projectDependencies;
};
