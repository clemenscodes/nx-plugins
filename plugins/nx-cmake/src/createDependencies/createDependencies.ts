import type {
    CreateDependencies,
    CreateDependenciesContext,
    RawProjectGraphDependency,
} from '@nx/devkit';
import {
    filterFilesToProcess,
    reduceDependenciesTransitively,
    getDependencies,
    filterProjects,
} from '@/graph';

export const createDependencies: CreateDependencies = (
    context: CreateDependenciesContext,
): RawProjectGraphDependency[] => {
    const { projects, nxJsonConfiguration, filesToProcess } = context;
    const { projectFileMap } = filesToProcess;
    const { workspaceLayout } = nxJsonConfiguration;
    const { libsDir } = workspaceLayout;
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
