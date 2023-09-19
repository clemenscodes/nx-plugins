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
    fileMap: ProjectFileMap
): ProjectGraphDependencyWithFile[] => {
    const deps: ProjectGraphDependencyWithFile[] = [];
    for (const project of projects) {
        const dependencies = filterDependenciesOfProject(
            project,
            workspaceLayout,
            projects,
            fileMap
        );
        deps.push(...dependencies);
    }
    return deps;
};
