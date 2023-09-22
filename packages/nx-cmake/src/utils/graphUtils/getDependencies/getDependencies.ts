import type {
    NxJsonConfiguration,
    ProjectFileMap,
    ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { filterDependenciesOfProject } from '../filterDependenciesOfProject/filterDependenciesOfProject';

export const getDependencies = (
    workspaceLayout: NxJsonConfiguration['workspaceLayout'],
    projects: FilteredProject[],
    filesToProcess: ProjectFileMap,
): ProjectGraphDependencyWithFile[] => {
    const deps: ProjectGraphDependencyWithFile[] = [];
    for (const project of Object.keys(filesToProcess)) {
        const projectFiles = filesToProcess[project];
        const filteredProject = projects.find(({ name }) => name === project);
        const dependencies = filterDependenciesOfProject(
            filteredProject,
            workspaceLayout,
            projects,
            projectFiles,
        );
        deps.push(...dependencies);
    }
    return deps;
};
