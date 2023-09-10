import type {
    CreateDependenciesContext,
    NxJsonConfiguration,
    ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { filterDependenciesOfProject } from '../filterDependenciesOfProject/filterDependenciesOfProject';

export const getDependencies = (
    workspaceLayout: NxJsonConfiguration['workspaceLayout'],
    ctx: CreateDependenciesContext,
    projects: FilteredProject[]
): ProjectGraphDependencyWithFile[] => {
    const deps: ProjectGraphDependencyWithFile[] = [];
    for (const project of projects) {
        const dependencies = filterDependenciesOfProject(
            project,
            workspaceLayout,
            ctx,
            projects
        );
        deps.push(...dependencies);
    }
    return deps;
};
