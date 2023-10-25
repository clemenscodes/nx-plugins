import type {
    CreateDependencies,
    CreateDependenciesContext,
    RawProjectGraphDependency,
} from '@nx/devkit';
import { filterFilesToProcess } from '../filterFilesToProcess/filterFilesToProcess';
import { filterProjects } from '../filterProjects/filterProjects';
import { getDependencies } from '../getDependencies/getDependencies';
import { reduceDependenciesTransitively } from '../reduceDependenciesTransitively/reduceDependenciesTransitively';
import { getWorkspaceLayout } from '@/util';

export const createDependencies: CreateDependencies = (
    _options,
    context: CreateDependenciesContext,
): RawProjectGraphDependency[] => {
    const { projects, filesToProcess } = context;
    const { projectFileMap } = filesToProcess;
    const { libsDir } = getWorkspaceLayout();
    if (Object.keys(filesToProcess).length === 0) {
        return [];
    }
    const filteredProjects = filterProjects(projects);
    const filteredFilesToProcess = filterFilesToProcess(
        projectFileMap,
        filteredProjects,
    );
    if (Object.keys(filteredFilesToProcess).length === 0) {
        return [];
    }
    const deps = getDependencies(
        libsDir,
        filteredProjects,
        filteredFilesToProcess,
    );
    if (deps.length === 0) {
        return [];
    }
    const reducedDeps = reduceDependenciesTransitively(deps);
    return reducedDeps;
};
