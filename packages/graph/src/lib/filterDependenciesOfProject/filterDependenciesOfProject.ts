import type { FileData, RawProjectGraphDependency } from '@nx/devkit';
import type { FilteredProject } from '@/config';
import { workspaceRoot } from '@nx/devkit';
import { filterGccDependencyOutput } from '../filterGccDependencyOutput/filterGccDependencyOutput';
import { getDependenciesOfFile } from '../getDependenciesOfFile/getDependenciesOfFile';
import { getGccDependencies } from './getGccDependencies/getGccDependencies';
import { getGccDependenciesCommand } from './getGccDependenciesCommand/getGccDependenciesCommand';
import { isValidProjectFile } from '../getDependenciesOfFile/isvalidProjectFile/isValidProjectFile';

export const filterDependenciesOfProject = (
    project: FilteredProject,
    libsDir: string,
    projects: FilteredProject[],
    filesToProcess: FileData[],
): RawProjectGraphDependency[] => {
    const { root, tag } = project;
    const projectDependencies: RawProjectGraphDependency[] = [];
    const filteredFilesToProcess = filesToProcess.filter((fileData) => {
        const { file } = fileData;
        const isSourceFile = isValidProjectFile(file, tag);
        return isSourceFile;
    });

    for (const fileData of filteredFilesToProcess) {
        const { file } = fileData;
        const cmd = getGccDependenciesCommand(file, root, libsDir, tag);
        const stdout = getGccDependencies(cmd, root, workspaceRoot);
        const files = filterGccDependencyOutput(stdout, file);
        const fileDependencies = getDependenciesOfFile(
            project,
            file,
            files,
            projects,
        );
        projectDependencies.push(...fileDependencies);
    }

    return projectDependencies;
};
