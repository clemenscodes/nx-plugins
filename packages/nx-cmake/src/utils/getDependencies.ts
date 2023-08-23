import type { ProjectGraphProcessorContext } from '@nx/devkit';
import type { FilteredProject, Deps } from '../models/types';
import { filterDependenciesOfProject } from './filterDependenciesOfProject';

export const getDependencies = async (
    libsDir: string,
    ctx: ProjectGraphProcessorContext,
    projects: FilteredProject[]
) => {
    const deps: Deps[] = [];
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
