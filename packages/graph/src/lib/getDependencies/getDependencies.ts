import type { ProjectFileMap, RawProjectGraphDependency } from '@nx/devkit';
import type { FilteredProject } from '@/config';
import { filterDependenciesOfProject } from '../filterDependenciesOfProject/filterDependenciesOfProject';

export const getDependencies = (
    libsDir: string,
    projects: FilteredProject[],
    filesToProcess: ProjectFileMap,
): RawProjectGraphDependency[] => {
    const deps: RawProjectGraphDependency[] = [];
    for (const project in filesToProcess) {
        const projectFiles = filesToProcess[project];
        const filteredProject = projects.find(({ name }) => name === project);
        if (!filteredProject) {
            throw new Error(`Failed to filter project ${project}`);
        }
        const dependencies = filterDependenciesOfProject(
            filteredProject,
            libsDir,
            projects,
            projectFiles,
        );
        deps.push(...dependencies);
    }
    return deps;
};
