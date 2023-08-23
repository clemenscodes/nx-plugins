import type {
    CreateDependenciesContext,
    ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { filterDependenciesOfProject } from '../filterDependenciesOfProject/filterDependenciesOfProject';

export const getDependencies = async (
    libsDir: string,
    ctx: CreateDependenciesContext,
    projects: FilteredProject[]
): Promise<ProjectGraphDependencyWithFile[]> => {
    const deps: ProjectGraphDependencyWithFile[] = [];
    for (const project of projects) {
        const dependencies = await filterDependenciesOfProject(
            project,
            libsDir,
            ctx,
            projects
        );
        deps.push(...dependencies);
    }
    return deps;
};
