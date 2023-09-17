import type {
    NxJsonConfiguration,
    ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { filterDependenciesOfProject } from '../filterDependenciesOfProject/filterDependenciesOfProject';

export const getDependencies = (
    workspaceLayout: NxJsonConfiguration['workspaceLayout'],
    projects: FilteredProject[]
): ProjectGraphDependencyWithFile[] => {
    const deps: ProjectGraphDependencyWithFile[] = [];
    for (const project of projects) {
        const dependencies = filterDependenciesOfProject(
            project,
            workspaceLayout,
            projects
        );
        deps.push(...dependencies);
    }
    return deps;
};
